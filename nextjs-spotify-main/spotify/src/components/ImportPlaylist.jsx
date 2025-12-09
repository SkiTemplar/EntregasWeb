'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import { FiDownload, FiSearch } from 'react-icons/fi';
import { FaListUl } from 'react-icons/fa';

export default function ImportPlaylist({ onImport }) {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const extractPlaylistId = (url) => {
    const match = url.match(/playlist[\/:]([a-zA-Z0-9]+)/);
    return match ? match[1] : url;
  };

  // Obtener TODAS las canciones de una playlist (con paginacion)
  const fetchAllPlaylistTracks = async (playlistId) => {
    const token = getAccessToken();
    let allTracks = [];
    let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

    while (url) {
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) return null;

      const data = await res.json();
      const tracks = data.items.filter(item => item.track).map(item => item.track);
      allTracks.push(...tracks);

      url = data.next; // URL de la siguiente pagina o null
    }

    return allTracks;
  };

  const handleImportByUrl = async () => {
    if (!playlistUrl.trim()) return;

    setLoading(true);
    const playlistId = extractPlaylistId(playlistUrl);

    try {
      const tracks = await fetchAllPlaylistTracks(playlistId);

      if (!tracks) {
        alert('No se pudo encontrar la playlist');
        setLoading(false);
        return;
      }

      onImport(tracks);
      setPlaylistUrl('');
      alert(`Se importaron ${tracks.length} canciones`);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al importar');
    }
    setLoading(false);
  };

  const loadUserPlaylists = async () => {
    if (showPlaylists) {
      setShowPlaylists(false);
      return;
    }

    setLoading(true);
    const token = getAccessToken();

    try {
      const res = await fetch(
        'https://api.spotify.com/v1/me/playlists?limit=20',
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await res.json();
      setUserPlaylists(data.items || []);
      setShowPlaylists(true);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const importFromPlaylist = async (playlistId) => {
    setLoading(true);

    try {
      const tracks = await fetchAllPlaylistTracks(playlistId);

      if (tracks) {
        onImport(tracks);
        setShowPlaylists(false);
        alert(`Se importaron ${tracks.length} canciones`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4 mb-6">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiDownload className="text-[#1DB954]" />
        Importar Playlist Existente
      </h3>

      {/* Importar por URL */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Pega URL de playlist de Spotify..."
            className="w-full bg-[#282828] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>
        <button
          onClick={handleImportByUrl}
          disabled={loading || !playlistUrl.trim()}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold px-4 py-2 rounded-full transition-all disabled:opacity-50"
        >
          {loading ? 'Importando...' : 'Importar'}
        </button>
      </div>

      {/* O cargar mis playlists */}
      <button
        onClick={loadUserPlaylists}
        disabled={loading}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
      >
        <FaListUl />
        {showPlaylists ? 'Ocultar mis playlists' : 'Ver mis playlists'}
      </button>

      {/* Lista de playlists del usuario */}
      {showPlaylists && (
        <div className="max-h-60 overflow-y-auto space-y-2">
          {userPlaylists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => importFromPlaylist(playlist.id)}
              className="flex items-center gap-3 p-2 hover:bg-[#282828] rounded cursor-pointer"
            >
              {playlist.images?.[0] ? (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-[#282828] flex items-center justify-center">
                  <FaListUl className="text-zinc-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{playlist.name}</p>
                <p className="text-zinc-400 text-xs">{playlist.tracks?.total} canciones</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
