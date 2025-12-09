'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import { FaSpotify } from 'react-icons/fa';

export default function Home() {
const router = useRouter();
const [checking, setChecking] = useState(true);

useEffect(() => {
// Verificar si ya esta autenticado
if (isAuthenticated()) {
router.replace('/dashboard');
} else {
setChecking(false);
}
}, [router]);

const handleLogin = () => {
const url = getSpotifyAuthUrl();
window.location.href = url;
};

// Mostrar loading mientras verifica autenticacion
if (checking) {
return (
<div className="min-h-screen bg-[#121212] flex items-center justify-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954]"></div>
</div>
);
}

return (
<div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex flex-col items-center justify-center">
<div className="text-center">
<FaSpotify className="text-[#1DB954] text-8xl mx-auto mb-6" />
<h1 className="text-4xl font-bold text-white mb-2">Spotify Taste Mixer</h1>
<p className="text-zinc-400 mb-8">Genera playlists personalizadas basadas en tus gustos</p>

        <button
          onClick={handleLogin}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
        >
          Iniciar sesion con Spotify
        </button>
      </div>
    </div>
);
}
