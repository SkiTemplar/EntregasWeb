# Spotify Taste Mixer - Documentacion Tecnica

## Indice

1. [Descripcion General](#descripcion-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Flujo de la Aplicacion](#flujo-de-la-aplicacion)
4. [Componentes](#componentes)
5. [Gestion de Estado](#gestion-de-estado)
6. [Llamadas a la API de Spotify](#llamadas-a-la-api-de-spotify)
7. [LocalStorage](#localstorage)
8. [Conceptos Clave de React](#conceptos-clave-de-react)

---

## Descripcion General

Spotify Taste Mixer es una aplicacion web construida con Next.js que permite a los usuarios:

- Buscar y seleccionar artistas favoritos
- Elegir generos musicales
- Filtrar por popularidad
- Generar playlists personalizadas
- Importar playlists existentes de Spotify
- Guardar las playlists creadas en su cuenta de Spotify
- Marcar canciones como favoritas

La aplicacion utiliza la API de Spotify para obtener datos musicales y gestionar playlists.

---

## Estructura del Proyecto

```
spotify/src/
├── app/                          # Paginas de Next.js (App Router)
│   ├── page.js                   # Pagina de login
│   ├── layout.js                 # Layout principal
│   ├── globals.css               # Estilos globales
│   ├── dashboard/
│   │   └── page.js               # Dashboard principal (pagina protegida)
│   ├── auth/
│   │   └── callback/
│   │       └── page.js           # Callback de autenticacion OAuth
│   └── api/
│       ├── spotify-token/
│       │   └── route.js          # API para obtener token
│       └── refresh-token/
│           └── route.js          # API para refrescar token
├── components/                   # Componentes React reutilizables
│   ├── Header.jsx                # Cabecera con logo y logout
│   ├── TrackCard.jsx             # Tarjeta de cancion individual
│   ├── PlaylistDisplay.jsx       # Visualizacion de la playlist
│   ├── ImportPlaylist.jsx        # Importar playlist existente
│   ├── SavePlaylistModal.jsx     # Modal para guardar playlist
│   └── widgets/
│       ├── ArtistWidget.jsx      # Widget de busqueda de artistas
│       ├── GenreWidget.jsx       # Widget de seleccion de generos
│       └── PopularityWidget.jsx  # Widget de filtro de popularidad
└── lib/                          # Utilidades y funciones auxiliares
    ├── auth.js                   # Funciones de autenticacion
    └── spotify.js                # Funciones de API de Spotify
```

---

## Flujo de la Aplicacion

### 1. Pagina de Inicio (page.js)

Cuando el usuario entra a la aplicacion:

```javascript
// Se verifica si ya esta autenticado
useEffect(() => {
  if (isAuthenticated()) {
    router.replace('/dashboard');  // Si tiene token valido, va al dashboard
  } else {
    setChecking(false);            // Si no, muestra el boton de login
  }
}, [router]);
```

**Conceptos importantes:**

- `useEffect`: Hook que se ejecuta cuando el componente se monta
- `router.replace`: Navega a otra pagina sin guardar en el historial
- `useState`: Hook para manejar el estado local del componente

### 2. Dashboard (dashboard/page.js)

Es la pagina principal donde el usuario interactua con la aplicacion.

**Estados que maneja:**

```javascript
const [selectedArtists, setSelectedArtists] = useState([]);   // Artistas seleccionados
const [selectedGenres, setSelectedGenres] = useState([]);     // Generos seleccionados
const [popularity, setPopularity] = useState([0, 100]);       // Rango de popularidad
const [playlist, setPlaylist] = useState([]);                 // Canciones de la playlist
const [loading, setLoading] = useState(false);                // Estado de carga
const [songCount, setSongCount] = useState(20);               // Numero de canciones a generar
const [favorites, setFavorites] = useState([]);               // Canciones favoritas
const [isReady, setIsReady] = useState(false);                // Si el componente esta listo
const [showSaveModal, setShowSaveModal] = useState(false);    // Mostrar modal de guardar
const [saving, setSaving] = useState(false);                  // Estado de guardado
```

---

## Componentes

### Header.jsx

Componente simple que muestra el logo y el boton de cerrar sesion.

```javascript
export default function Header({ onLogout }) {
  return (
    <header>
      <FaSpotify />                           {/* Icono de Spotify */}
      <span>Taste Mixer</span>                {/* Nombre de la app */}
      <button onClick={onLogout}>             {/* Boton logout */}
        <FiLogOut />
        Cerrar sesion
      </button>
    </header>
  );
}
```

**Props recibidas:**
- `onLogout`: Funcion que se ejecuta al hacer click en cerrar sesion

---

### ArtistWidget.jsx

Widget para buscar y seleccionar artistas.

**Estados locales:**

```javascript
const [query, setQuery] = useState('');        // Texto de busqueda
const [results, setResults] = useState([]);    // Resultados de busqueda
const [loading, setLoading] = useState(false); // Estado de carga
```

**Funcion de busqueda:**

```javascript
const searchArtists = async (searchQuery) => {
  // 1. Si no hay texto, limpiar resultados
  if (!searchQuery.trim()) {
    setResults([]);
    return;
  }

  setLoading(true);
  const token = getAccessToken();  // Obtener token de localStorage

  // 2. Llamar a la API de Spotify
  const res = await fetch(
    `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(searchQuery)}&limit=5`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  
  const data = await res.json();
  setResults(data.artists?.items || []);  // Guardar resultados
  setLoading(false);
};
```

**Props recibidas:**
- `selectedArtists`: Array de artistas ya seleccionados
- `onSelect`: Funcion para actualizar los artistas seleccionados

**Como funciona la comunicacion padre-hijo:**

```javascript
// En el Dashboard (padre):
<ArtistWidget 
  selectedArtists={selectedArtists}      // Paso el estado actual
  onSelect={setSelectedArtists}          // Paso la funcion para actualizarlo
/>

// En ArtistWidget (hijo):
const addArtist = (artist) => {
  onSelect([...selectedArtists, artist]); // Llamo a la funcion del padre
};
```

---

### GenreWidget.jsx

Widget para seleccionar generos musicales.

**Generos predefinidos:**

```javascript
const GENRES = [
  'pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical', 
  'r-n-b', 'country', 'reggaeton', 'metal', 'indie', 'folk',
  'latin', 'blues', 'soul', 'punk', 'alternative', 'dance'
];
```

**Funcion para seleccionar/deseleccionar:**

```javascript
const toggleGenre = (genre) => {
  if (selectedGenres.includes(genre)) {
    // Si ya esta seleccionado, lo quita
    onSelect(selectedGenres.filter(g => g !== genre));
  } else if (selectedGenres.length < 5) {
    // Si no esta y hay menos de 5, lo agrega
    onSelect([...selectedGenres, genre]);
  }
};
```

---

### PopularityWidget.jsx

Widget para filtrar canciones por popularidad (0-100).

**Presets de popularidad:**

```javascript
// Mainstream: canciones muy populares (80-100)
// Popular: canciones conocidas (50-80)
// Underground: canciones poco conocidas (0-50)
// Todos: sin filtro (0-100)

const setPreset = (min, max) => {
  onSelect([min, max]);
};
```

---

### TrackCard.jsx

Componente que muestra una cancion individual.

```javascript
export default function TrackCard({ track, isFavorite, onRemove, onToggleFavorite }) {
  // Formatear duracion de milisegundos a minutos:segundos
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div>
      <img src={track.album?.images?.[0]?.url} />  {/* Portada */}
      <p>{track.name}</p>                           {/* Nombre */}
      <p>{track.artists?.map(a => a.name).join(', ')}</p>  {/* Artistas */}
      <span>{formatDuration(track.duration_ms)}</span>     {/* Duracion */}
      
      {/* Boton de favorito */}
      <button onClick={() => onToggleFavorite(track)}>
        {isFavorite ? <FaHeart /> : <FiHeart />}
      </button>
      
      {/* Boton de eliminar */}
      <button onClick={() => onRemove(track.id)}>
        <FiTrash2 />
      </button>
    </div>
  );
}
```

**Props recibidas:**
- `track`: Objeto con los datos de la cancion
- `isFavorite`: Booleano que indica si es favorita
- `onRemove`: Funcion para eliminar de la playlist
- `onToggleFavorite`: Funcion para marcar/desmarcar favorito

---

### PlaylistDisplay.jsx

Componente que muestra la playlist generada.

```javascript
export default function PlaylistDisplay({ 
  playlist,           // Array de canciones
  favorites,          // Array de favoritos
  onRemove,           // Funcion para eliminar cancion
  onToggleFavorite,   // Funcion para toggle favorito
  onRefresh,          // Funcion para regenerar playlist
  onSave              // Funcion para abrir modal de guardar
}) {
  // Si no hay canciones, mostrar mensaje
  if (playlist.length === 0) {
    return (
      <div>
        <FaMusic />
        <p>Selecciona artistas o generos y genera tu playlist</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Tu Playlist ({playlist.length} canciones)</h3>
      
      <button onClick={onSave}>Guardar en Spotify</button>
      <button onClick={onRefresh}><FiRefreshCw /></button>
      
      {/* Mapear cada cancion a un TrackCard */}
      {playlist.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          isFavorite={favorites.some(f => f.id === track.id)}
          onRemove={onRemove}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
```

---

### ImportPlaylist.jsx

Componente para importar playlists existentes de Spotify.

**Funcion para obtener TODAS las canciones (con paginacion):**

```javascript
const fetchAllPlaylistTracks = async (playlistId) => {
  const token = getAccessToken();
  let allTracks = [];
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

  // Mientras haya mas paginas, seguir pidiendo
  while (url) {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    
    // Filtrar tracks nulos y extraer solo el track
    const tracks = data.items
      .filter(item => item.track)
      .map(item => item.track);
    
    allTracks.push(...tracks);  // Agregar al array
    url = data.next;            // URL de la siguiente pagina o null
  }

  return allTracks;
};
```

**Extraer ID de URL de Spotify:**

```javascript
const extractPlaylistId = (url) => {
  // Soporta:
  // https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
  // spotify:playlist:37i9dQZF1DXcBWIGoYBM5M
  const match = url.match(/playlist[\/:]([a-zA-Z0-9]+)/);
  return match ? match[1] : url;
};
```

---

### SavePlaylistModal.jsx

Modal para guardar la playlist en Spotify.

```javascript
export default function SavePlaylistModal({ isOpen, onClose, onSave, loading }) {
  const [name, setName] = useState('');

  // Si no esta abierto, no renderizar nada
  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert('Escribe un nombre para la playlist');
      return;
    }
    onSave(name.trim());  // Llamar funcion del padre con el nombre
    setName('');          // Limpiar input
  };

  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="fixed inset-0 bg-black/70">
      <div>
        <h2>Guardar en Spotify</h2>
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la playlist..."
        />
        
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}
```

---

## Gestion de Estado

### useState - Estado Local

Cada componente puede tener su propio estado:

```javascript
const [valor, setValor] = useState(valorInicial);

// Ejemplos:
const [loading, setLoading] = useState(false);
const [playlist, setPlaylist] = useState([]);
const [name, setName] = useState('');
```

**Actualizar estado:**

```javascript
// Valor directo
setLoading(true);

// Basado en valor anterior (recomendado para arrays)
setPlaylist(prev => [...prev, nuevaCancion]);

// Filtrar elementos
setPlaylist(prev => prev.filter(t => t.id !== trackId));
```

### useEffect - Efectos Secundarios

Se ejecuta cuando el componente se monta o cuando cambian las dependencias:

```javascript
useEffect(() => {
  // Este codigo se ejecuta al montar el componente
  // y cada vez que cambie 'router'
  
  if (!isAuthenticated()) {
    router.replace('/');
  }
}, [router]);  // Array de dependencias
```

**Casos de uso:**
- Verificar autenticacion al cargar
- Cargar datos de localStorage
- Hacer peticiones iniciales

---

## Llamadas a la API de Spotify

### Estructura basica de una peticion

```javascript
const token = getAccessToken();  // Obtener token del localStorage

const response = await fetch('https://api.spotify.com/v1/...', {
  method: 'GET',  // o 'POST'
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'  // Solo para POST
  },
  body: JSON.stringify({ ... })  // Solo para POST
});

const data = await response.json();
```

### Endpoints utilizados

**1. Buscar artistas:**
```
GET /search?type=artist&q={query}&limit=5
```

**2. Top tracks de un artista:**
```
GET /artists/{id}/top-tracks?market=ES
```

**3. Buscar por genero:**
```
GET /search?type=track&q=genre:{genre}&limit=20
```

**4. Obtener playlists del usuario:**
```
GET /me/playlists?limit=20
```

**5. Obtener tracks de una playlist:**
```
GET /playlists/{id}/tracks?limit=100
```

**6. Obtener perfil del usuario:**
```
GET /me
```

**7. Crear playlist:**
```
POST /users/{user_id}/playlists
Body: { name, description, public }
```

**8. Agregar canciones a playlist:**
```
POST /playlists/{playlist_id}/tracks
Body: { uris: ['spotify:track:xxx', ...] }
```

---

## LocalStorage

### Favoritos

```javascript
// Guardar favoritos
localStorage.setItem('favorite_tracks', JSON.stringify(favorites));

// Cargar favoritos
const saved = localStorage.getItem('favorite_tracks');
if (saved) {
  setFavorites(JSON.parse(saved));
}
```

### Tokens de autenticacion

```javascript
// Guardar (en auth.js)
localStorage.setItem('spotify_token', accessToken);
localStorage.setItem('spotify_refresh_token', refreshToken);
localStorage.setItem('spotify_token_expiration', expirationTime);

// Obtener
const token = localStorage.getItem('spotify_token');

// Limpiar (logout)
localStorage.removeItem('spotify_token');
```

---

## Conceptos Clave de React

### Props (Propiedades)

Son datos que un componente padre pasa a un hijo:

```javascript
// Padre
<TrackCard 
  track={cancion}
  isFavorite={true}
  onRemove={handleRemove}
/>

// Hijo
function TrackCard({ track, isFavorite, onRemove }) {
  // Usar las props
  return <div>{track.name}</div>;
}
```

### Comunicacion Padre-Hijo

**De padre a hijo:** A traves de props

```javascript
// Padre tiene el estado
const [artistas, setArtistas] = useState([]);

// Padre pasa el estado y la funcion al hijo
<ArtistWidget 
  selectedArtists={artistas}
  onSelect={setArtistas}
/>
```

**De hijo a padre:** A traves de funciones callback

```javascript
// En el hijo, cuando el usuario selecciona algo:
const handleClick = (artist) => {
  onSelect([...selectedArtists, artist]);  // Llama funcion del padre
};
```

### Renderizado Condicional

```javascript
// Con operador ternario
{loading ? 'Cargando...' : 'Listo'}

// Con operador &&
{playlist.length > 0 && <button>Agregar mas</button>}

// Con return temprano
if (!isOpen) return null;
```

### Listas y Keys

```javascript
{playlist.map((track) => (
  <TrackCard
    key={track.id}      // Key unica para cada elemento
    track={track}
  />
))}
```

### Eventos

```javascript
// Click
<button onClick={handleClick}>Guardar</button>

// Input controlado
<input 
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Prevenir comportamiento por defecto
<form onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
```

---

## Flujo Completo: Generar Playlist

1. Usuario selecciona artistas en ArtistWidget
2. Usuario selecciona generos en GenreWidget
3. Usuario ajusta popularidad en PopularityWidget
4. Usuario elige numero de canciones (10, 20, 30, 50)
5. Usuario hace click en "Generar Playlist"

```javascript
const generatePlaylist = async () => {
  // 1. Validar que hay selecciones
  if (selectedArtists.length === 0 && selectedGenres.length === 0) {
    alert('Selecciona al menos un artista o genero');
    return;
  }

  setLoading(true);
  
  // 2. Obtener token
  const token = getAccessToken();
  
  // 3. Buscar tracks de artistas seleccionados
  for (const artist of selectedArtists) {
    const res = await fetch(`/artists/${artist.id}/top-tracks`);
    const data = await res.json();
    allTracks.push(...data.tracks);
  }

  // 4. Buscar tracks por generos
  for (const genre of selectedGenres) {
    const res = await fetch(`/search?type=track&q=genre:${genre}`);
    const data = await res.json();
    allTracks.push(...data.tracks.items);
  }

  // 5. Filtrar por popularidad
  allTracks = allTracks.filter(
    t => t.popularity >= popularity[0] && t.popularity <= popularity[1]
  );

  // 6. Eliminar duplicados
  const unique = [...new Map(allTracks.map(t => [t.id, t])).values()];

  // 7. Mezclar aleatoriamente
  const shuffled = unique.sort(() => Math.random() - 0.5);

  // 8. Limitar al numero seleccionado
  setPlaylist(shuffled.slice(0, songCount));
  
  setLoading(false);
};
```

---

## Flujo Completo: Guardar en Spotify

1. Usuario hace click en "Guardar en Spotify"
2. Se abre el modal
3. Usuario escribe nombre
4. Usuario hace click en "Guardar"

```javascript
const savePlaylistToSpotify = async (name) => {
  setSaving(true);
  const token = getAccessToken();

  // 1. Obtener ID del usuario
  const userRes = await fetch('/me');
  const user = await userRes.json();

  // 2. Crear playlist vacia
  const createRes = await fetch(`/users/${user.id}/playlists`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      description: 'Creada con Spotify Taste Mixer',
      public: false
    })
  });
  const newPlaylist = await createRes.json();

  // 3. Agregar canciones en lotes de 100
  const trackUris = playlist.map(t => t.uri);
  for (let i = 0; i < trackUris.length; i += 100) {
    const batch = trackUris.slice(i, i + 100);
    await fetch(`/playlists/${newPlaylist.id}/tracks`, {
      method: 'POST',
      body: JSON.stringify({ uris: batch })
    });
  }

  // 4. Cerrar modal y notificar
  setShowSaveModal(false);
  alert(`Playlist guardada con ${playlist.length} canciones`);
  
  setSaving(false);
};
```

---

## Resumen de Funcionalidades

| Funcionalidad | Componente | Descripcion |
|---------------|------------|-------------|
| Buscar artistas | ArtistWidget | Busqueda con debounce, max 5 |
| Seleccionar generos | GenreWidget | Lista predefinida, max 5 |
| Filtrar popularidad | PopularityWidget | Sliders y presets |
| Generar playlist | Dashboard | Combina artistas + generos |
| Importar playlist | ImportPlaylist | Por URL o desde tus playlists |
| Eliminar cancion | TrackCard | Boton de basura |
| Marcar favorito | TrackCard | Guardado en localStorage |
| Regenerar | PlaylistDisplay | Mismas preferencias, nuevas canciones |
| Agregar mas | Dashboard | Agrega 5 canciones nuevas |
| Guardar en Spotify | SavePlaylistModal | Crea playlist en tu cuenta |

