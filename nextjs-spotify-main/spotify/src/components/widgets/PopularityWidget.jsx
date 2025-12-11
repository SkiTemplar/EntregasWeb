'use client';

import { FiTrendingUp } from 'react-icons/fi';

export default function PopularityWidget({ selectedCategory, onSelect }) {
  const categories = [
    { id: 'mainstream', label: 'Mainstream', range: [80, 100], desc: 'Top hits del momento' },
    { id: 'popular', label: 'Popular', range: [50, 79], desc: 'Canciones conocidas' },
    { id: 'underground', label: 'Underground', range: [0, 49], desc: 'Joyas escondidas' },
    { id: 'all', label: 'Todos', range: [0, 100], desc: 'Sin filtro' }
  ];

  return (
    <div className="bg-[#181818] rounded-lg p-4 h-[280px] flex flex-col">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiTrendingUp className="text-[#1DB954]" />
        Popularidad
      </h3>

      <div className="flex-1 flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className={`flex-1 text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between ${
              selectedCategory?.id === category.id
                ? 'bg-[#1DB954] text-black'
                : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
            }`}
          >
            <div>
              <p className={`font-bold text-sm ${selectedCategory?.id === category.id ? 'text-black' : 'text-white'}`}>
                {category.label}
              </p>
              <p className={`text-xs ${selectedCategory?.id === category.id ? 'text-black/70' : 'text-zinc-400'}`}>
                {category.desc}
              </p>
            </div>
            {selectedCategory?.id === category.id && (
              <span className="text-lg">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
