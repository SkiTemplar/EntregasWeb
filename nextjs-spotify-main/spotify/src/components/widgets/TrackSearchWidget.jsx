'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';
import { FaMusic } from 'react-icons/fa';
import { getAccessToken } from '@/lib/auth';

export default function TrackSearchWidget({ onAddTrack, playlist }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTracks = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const token = getAccessToken();

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(searchQuery)}&limit=5`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await res.json();
      setResults(data.tracks?.items || []);
    } catch (error) {
      console.error('Error buscando tracks:', error);
    }
    setLoading(false);
  };

  // Debounce para la búsqueda
  let debounceTimer;
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => searchTracks(value), 300);
  };

  const addTrack = (track) => {
    onAddTrack(track);
    // Feedback visual - quitar de resultados después de añadir
    setResults(results.filter(t => t.id !== track.id));
  };

  const isInPlaylist = (trackId) => {
    return playlist?.some(t => t.id === trackId);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4 h-[280px] flex flex-col">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FaMusic className="text-[#1DB954]" />
        Buscar Canciones
      </h3>

      {/* Buscador */}
      <div className="relative mb-2">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar canción..."
          className="w-full bg-[#282828] text-white pl-9 pr-9 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Resultados */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1DB954]"></div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-1">
            {results.map(track => (
              <div
                key={track.id}
                className="flex items-center gap-2 p-1.5 bg-[#282828] hover:bg-[#3e3e3e] rounded transition-colors"
              >
                <img
                  src={track.album?.images?.[2]?.url || '/placeholder.png'}
                  alt={track.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{track.name}</p>
                  <p className="text-zinc-400 text-xs truncate">{track.artists?.map(a => a.name).join(', ')}</p>
                </div>
                {isInPlaylist(track.id) ? (
                  <span className="text-[#1DB954] text-xs">✓</span>
                ) : (
                  <button
                    onClick={() => addTrack(track)}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-black p-1 rounded-full"
                  >
                    <FiPlus size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!query && !loading && results.length === 0 && (
          <p className="text-zinc-500 text-xs text-center py-4">
            Busca y añade canciones directamente
          </p>
        )}
      </div>
    </div>
  );
}
