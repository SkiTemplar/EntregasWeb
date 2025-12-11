'use client';

import { useState } from 'react';
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
    <div className="bg-[#181818] rounded-lg p-4 h-[280px] flex flex-col">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiMusic className="text-[#1DB954]" />
        Géneros
      </h3>

      {/* Filtro */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar géneros..."
        className="w-full bg-[#282828] text-white px-4 py-2 rounded-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-sm"
      />

      {/* Lista de generos */}
      <div className="flex-1 overflow-y-auto mb-2">
        <div className="flex flex-wrap gap-1.5">
          {filteredGenres.map(genre => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                selectedGenres.includes(genre)
                  ? 'bg-[#1DB954] text-black font-bold'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Seleccionados */}
      <div className="pt-2 border-t border-zinc-700 min-h-[32px]">
        {selectedGenres.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedGenres.map(genre => (
              <span
                key={genre}
                className="bg-[#1DB954] text-black text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                {genre}
                <FiX className="cursor-pointer" size={12} onClick={() => toggleGenre(genre)} />
              </span>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-xs">Máximo 5 géneros</p>
        )}
      </div>
    </div>
  );
}
