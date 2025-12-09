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

// Debounce simple
const handleSearch = (e) => {
const value = e.target.value;
setQuery(value);
setTimeout(() => searchArtists(value), 300);
};

const addArtist = (artist) => {
if (selectedArtists.length >= 5) {
alert('Maximo 5 artistas');
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
<div className="bg-[#181818] rounded-lg p-4">
<h3 className="text-white font-bold mb-3 flex items-center gap-2">
<FaUser className="text-[#1DB954]" />
Artistas
</h3>

      {/* Buscador */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar artista..."
          className="w-full bg-[#282828] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
      </div>

      {/* Resultados */}
      {loading && <p className="text-zinc-400 text-sm">Buscando...</p>}

      {results.length > 0 && (
        <div className="mb-3 max-h-40 overflow-y-auto">
          {results.map(artist => (
            <div
              key={artist.id}
              onClick={() => addArtist(artist)}
              className="flex items-center gap-3 p-2 hover:bg-[#282828] rounded cursor-pointer"
            >
              {artist.images?.[0] ? (
                <img src={artist.images[0].url} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
                  <FaUser className="text-zinc-400" />
                </div>
              )}
              <span className="text-white text-sm">{artist.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Seleccionados */}
      <div className="flex flex-wrap gap-2">
        {selectedArtists.map(artist => (
          <span
            key={artist.id}
            className="bg-[#1DB954] text-black text-sm px-3 py-1 rounded-full flex items-center gap-1"
          >
            {artist.name}
            <FiX className="cursor-pointer" onClick={() => removeArtist(artist.id)} />
          </span>
        ))}
      </div>
    </div>
);
}

