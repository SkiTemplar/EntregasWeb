'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import { FiSearch, FiX } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

export default function ArtistWidget({ selectedArtists, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchArtists = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const token = getAccessToken();

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(searchQuery)}&limit=5`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await res.json();
      setResults(data.artists?.items || []);
    } catch (error) {
      console.error('Error buscando artistas:', error);
    }
    setLoading(false);
  };

  let debounceTimer;
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => searchArtists(value), 300);
  };

  const addArtist = (artist) => {
    if (selectedArtists.length >= 5) {
      alert('Máximo 5 artistas');
      return;
    }
    if (!selectedArtists.find(a => a.id === artist.id)) {
      onSelect([...selectedArtists, artist]);
    }
    setQuery('');
    setResults([]);
  };

  const removeArtist = (artistId) => {
    onSelect(selectedArtists.filter(a => a.id !== artistId));
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4 h-[280px] flex flex-col">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FaUser className="text-[#1DB954]" />
        Artistas
      </h3>

      {/* Buscador */}
      <div className="relative mb-2">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar artista..."
          className="w-full bg-[#282828] text-white pl-9 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-sm"
        />
      </div>

      {/* Resultados */}
      <div className="flex-1 overflow-y-auto">
        {loading && <p className="text-zinc-400 text-xs">Buscando...</p>}

        {results.length > 0 && (
          <div className="space-y-1">
            {results.map(artist => (
              <div
                key={artist.id}
                onClick={() => addArtist(artist)}
                className="flex items-center gap-2 p-1.5 hover:bg-[#282828] rounded cursor-pointer"
              >
                {artist.images?.[0] ? (
                  <img src={artist.images[0].url} alt={artist.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center">
                    <FaUser className="text-zinc-400" size={12} />
                  </div>
                )}
                <span className="text-white text-sm truncate">{artist.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seleccionados */}
      <div className="pt-2 border-t border-zinc-700 min-h-[40px]">
        {selectedArtists.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedArtists.map(artist => (
              <span
                key={artist.id}
                className="bg-[#1DB954] text-black text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                {artist.name}
                <FiX className="cursor-pointer" size={12} onClick={() => removeArtist(artist.id)} />
              </span>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-xs">Máximo 5 artistas</p>
        )}
      </div>
    </div>
  );
}
