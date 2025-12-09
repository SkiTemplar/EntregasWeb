'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout, getAccessToken } from '@/lib/auth';
import Header from '@/components/Header';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import GenreWidget from '@/components/widgets/GenreWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import FavoritesSection from '@/components/FavoritesSection';
import ImportPlaylist from '@/components/ImportPlaylist';
import SavePlaylistModal from '@/components/SavePlaylistModal';

export default function Dashboard() {
const router = useRouter();
const [selectedArtists, setSelectedArtists] = useState([]);
const [selectedGenres, setSelectedGenres] = useState([]);
const [popularityCategory, setPopularityCategory] = useState({ id: 'all', label: 'Todos', range: [0, 100] });
const [selectedDecades, setSelectedDecades] = useState([]);
const [selectedMoods, setSelectedMoods] = useState([]);
const [playlist, setPlaylist] = useState([]);
const [loading, setLoading] = useState(false);
const [songCount, setSongCount] = useState(20);
const [favorites, setFavorites] = useState([]);
const [isReady, setIsReady] = useState(false);
const [showSaveModal, setShowSaveModal] = useState(false);
const [saving, setSaving] = useState(false);

useEffect(() => {
if (!isAuthenticated()) {
router.replace('/');
return;
}

    // Cargar favoritos desde localStorage
    try {
      const saved = localStorage.getItem('favorite_tracks');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }

    setIsReady(true);
}, [router]);

// Buscar tracks con todos los filtros
const fetchTracks = async (token, limit = 20) => {
let allTracks = [];

    // 1. Buscar por artistas
    for (const artist of selectedArtists) {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=ES`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.tracks) allTracks.push(...data.tracks);
      } catch (e) { console.error(e); }
    }

    // 2. Buscar por géneros
    for (const genre of selectedGenres) {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=${limit}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.tracks?.items) allTracks.push(...data.tracks.items);
      } catch (e) { console.error(e); }
    }

    // 3. Buscar por décadas
    for (const decade of selectedDecades) {
      try {
        const yearQuery = `year:${decade.range[0]}-${decade.range[1]}`;
        const res = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=${yearQuery}&limit=${limit}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.tracks?.items) allTracks.push(...data.tracks.items);
      } catch (e) { console.error(e); }
    }

    // 4. Si no hay selecciones específicas, usar top tracks del usuario
    if (selectedArtists.length === 0 && selectedGenres.length === 0 && selectedDecades.length === 0) {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.items) allTracks.push(...data.items);
      } catch (e) { console.error(e); }
    }

    // Filtrar por popularidad
    allTracks = allTracks.filter(
      t => t.popularity >= popularityCategory.range[0] && t.popularity <= popularityCategory.range[1]
    );

    // Filtrar por mood (si está seleccionado)
    // Nota: La API de búsqueda no soporta filtros de audio features directamente
    // En una implementación completa, necesitarías hacer peticiones adicionales
    // a /audio-features para filtrar por mood

    // Eliminar duplicados
    return [...new Map(allTracks.map(t => [t.id, t])).values()];
};

// Generar playlist
const generatePlaylist = async () => {
if (selectedArtists.length === 0 && selectedGenres.length === 0 && selectedDecades.length === 0) {
alert('Selecciona al menos un artista, género o década');
return;
}

    setLoading(true);
    try {
      const token = getAccessToken();
      const tracks = await fetchTracks(token, 50);
      const shuffled = tracks.sort(() => Math.random() - 0.5);
      setPlaylist(shuffled.slice(0, songCount));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar playlist');
    }
    setLoading(false);
};

// Refrescar playlist - regenerar con las mismas preferencias
const refreshPlaylist = async () => {
if (playlist.length === 0) return;

    setLoading(true);
    try {
      const token = getAccessToken();
      const tracks = await fetchTracks(token, 50);
      // Excluir tracks actuales para obtener canciones diferentes
      const currentIds = new Set(playlist.map(t => t.id));
      const newTracks = tracks.filter(t => !currentIds.has(t.id));
      const shuffled = newTracks.sort(() => Math.random() - 0.5);
      setPlaylist(shuffled.slice(0, songCount));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al refrescar playlist');
    }
    setLoading(false);
};

// Agregar mas canciones
const addMoreSongs = async () => {
if (selectedArtists.length === 0 && selectedGenres.length === 0 && selectedDecades.length === 0) return;

    setLoading(true);
    try {
      const token = getAccessToken();
      const tracks = await fetchTracks(token, 50);
      const existingIds = new Set(playlist.map(t => t.id));
      const newTracks = tracks.filter(t => !existingIds.has(t.id));
      const shuffled = newTracks.sort(() => Math.random() - 0.5);
      setPlaylist(prev => [...prev, ...shuffled.slice(0, 5)]);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
};

// Guardar playlist en Spotify
const savePlaylistToSpotify = async (name) => {
setSaving(true);
const token = getAccessToken();

    try {
      // 1. Obtener usuario
      const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const user = await userRes.json();

      // 2. Crear playlist
      const createRes = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: 'Creada con Spotify Taste Mixer',
          public: false
        })
      });
      const newPlaylist = await createRes.json();

      // 3. Añadir canciones (en lotes de 100)
      const trackUris = playlist.map(t => t.uri);
      for (let i = 0; i < trackUris.length; i += 100) {
        const batch = trackUris.slice(i, i + 100);
        await fetch(`https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: batch })
        });
      }

      setShowSaveModal(false);
      alert(`Playlist "${name}" guardada en Spotify con ${playlist.length} canciones`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la playlist');
    }
    setSaving(false);
};

// Importar playlist existente
const handleImportPlaylist = (tracks) => {
setPlaylist(prev => {
const combined = [...prev, ...tracks];
return [...new Map(combined.map(t => [t.id, t])).values()];
});
};

const removeTrack = (trackId) => {
setPlaylist(prev => prev.filter(t => t.id !== trackId));
};

const toggleFavorite = (track) => {
const exists = favorites.find(f => f.id === track.id);
const updated = exists
? favorites.filter(f => f.id !== track.id)
: [...favorites, track];
setFavorites(updated);
localStorage.setItem('favorite_tracks', JSON.stringify(updated));
};

const handleLogout = () => {
logout();
router.replace('/');
};

if (!isReady) {
return (
<div className="min-h-screen bg-[#121212] flex items-center justify-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954]"></div>
</div>
);
}

return (
<div className="min-h-screen bg-[#121212]">
<Header onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Sección de Favoritos */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <FavoritesSection
              favorites={favorites}
              onRemove={removeTrack}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}

        {/* Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ArtistWidget selectedArtists={selectedArtists} onSelect={setSelectedArtists} />
          <GenreWidget selectedGenres={selectedGenres} onSelect={setSelectedGenres} />
          <PopularityWidget selectedCategory={popularityCategory} onSelect={setPopularityCategory} />
          <DecadeWidget selectedDecades={selectedDecades} onSelect={setSelectedDecades} />
          <MoodWidget selectedMoods={selectedMoods} onSelect={setSelectedMoods} />
        </div>

        {/* Generar Playlist */}
        <div className="bg-[#181818] rounded-lg p-4 mb-6">
          <h3 className="text-white font-bold mb-3">Generar Nueva Playlist</h3>
          <div className="flex gap-4 items-center flex-wrap">
            <label className="text-zinc-400 flex items-center gap-2">
              Canciones:
              <select
                value={songCount}
                onChange={(e) => setSongCount(Number(e.target.value))}
                className="bg-[#282828] text-white px-3 py-2 rounded"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </label>
            <button
              onClick={generatePlaylist}
              disabled={loading}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors"
            >
              {loading ? 'Generando...' : 'Generar Playlist'}
            </button>
          </div>
        </div>

        {/* Importar Playlist */}
        <ImportPlaylist onImport={handleImportPlaylist} />

        {/* Botones de playlist */}
        {playlist.length > 0 && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={addMoreSongs}
              disabled={loading}
              className="bg-[#282828] hover:bg-[#3e3e3e] text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors"
            >
              {loading ? 'Agregando...' : 'Agregar más canciones'}
            </button>
          </div>
        )}

        {/* Playlist */}
        <PlaylistDisplay
          playlist={playlist}
          favorites={favorites}
          onRemove={removeTrack}
          onToggleFavorite={toggleFavorite}
          onRefresh={refreshPlaylist}
          onSave={() => setShowSaveModal(true)}
        />
      </main>

      {/* Modal para guardar */}
      <SavePlaylistModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={savePlaylistToSpotify}
        loading={saving}
      />
    </div>
);
}
