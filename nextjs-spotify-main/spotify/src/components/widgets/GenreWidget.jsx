'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import { FiMusic, FiX } from 'react-icons/fi';

// Generos predefinidos (ya que el endpoint esta deprecado en algunas regiones)
const GENRES = [
  'pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical',
  'r-n-b', 'country', 'reggaeton', 'metal', 'indie', 'folk',
  'latin', 'blues', 'soul', 'punk', 'alternative', 'dance'
];

export default function GenreWidget({ selectedGenres, onSelect }) {
  const [filter, setFilter] = useState('');

  const filteredGenres = GENRES.filter(genre =>
    genre.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      onSelect(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 5) {
      onSelect([...selectedGenres, genre]);
    } else {
      alert('Maximo 5 generos');
    }
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiMusic className="text-[#1DB954]" />
        Generos
      </h3>

      {/* Filtro */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar generos..."
        className="w-full bg-[#282828] text-white px-4 py-2 rounded-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
      />

      {/* Lista de generos */}
      <div className="max-h-32 overflow-y-auto mb-3">
        <div className="flex flex-wrap gap-2">
          {filteredGenres.map(genre => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                selectedGenres.includes(genre)
                  ? 'bg-[#1DB954] text-black'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Seleccionados */}
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#282828]">
          {selectedGenres.map(genre => (
            <span
              key={genre}
              className="bg-[#1DB954] text-black text-sm px-3 py-1 rounded-full flex items-center gap-1"
            >
              {genre}
              <FiX className="cursor-pointer" onClick={() => toggleGenre(genre)} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

