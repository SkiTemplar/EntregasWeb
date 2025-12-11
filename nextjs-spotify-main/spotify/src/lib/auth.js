// Generar string aleatorio para el parámetro 'state'
export function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Construir URL de autorización de Spotify
export function getSpotifyAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || '';
  const state = generateRandomString(16);

  // Guardar el state para validación posterior (prevenir CSRF)
  if (typeof window !== 'undefined') {
    localStorage.setItem('spotify_auth_state', state);
  }

  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read'
  ].join(' ');

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    state: state,
    scope: scope
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Guardar tokens en localStorage
export function saveTokens(accessToken, refreshToken, expiresIn) {
  if (typeof window === 'undefined') return;
  const expirationTime = Date.now() + expiresIn * 1000;
  localStorage.setItem('spotify_token', accessToken);
  localStorage.setItem('spotify_refresh_token', refreshToken);
  localStorage.setItem('spotify_token_expiration', expirationTime.toString());
}

// Obtener token actual (con verificación de expiración)
export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('spotify_token');
  const expiration = localStorage.getItem('spotify_token_expiration');
  
  if (!token || !expiration) return null;
  
  // Si el token expiró, retornar null
  if (Date.now() > parseInt(expiration)) {
    return null;
  }
  
  return token;
}

// Verificar si hay token válido
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return getAccessToken() !== null;
}

// Cerrar sesión
export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_token_expiration');
}

// Obtener refresh token
export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('spotify_refresh_token');
}

// Refrescar token automáticamente
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error('No refresh token available');
    return null;
  }

  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();

    // Guardar nuevo token
    saveTokens(
      data.access_token,
      data.refresh_token || refreshToken, // Spotify puede o no devolver nuevo refresh_token
      data.expires_in
    );

    return data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Si falla el refresh, limpiar tokens y redirigir a login
    logout();
    return null;
  }
}

// Obtener token válido (con refresh automático si expiró)
export async function getValidAccessToken() {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('spotify_token');
  const expiration = localStorage.getItem('spotify_token_expiration');

  if (!token || !expiration) return null;

  // Si el token expira en menos de 5 minutos, refrescarlo
  const expirationTime = parseInt(expiration);
  const fiveMinutes = 5 * 60 * 1000;

  if (Date.now() > expirationTime - fiveMinutes) {
    console.log('Token expired or expiring soon, refreshing...');
    return await refreshAccessToken();
  }

  return token;
}
