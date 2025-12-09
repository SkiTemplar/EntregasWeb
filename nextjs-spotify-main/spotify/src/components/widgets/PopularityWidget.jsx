'use client';

import { FiTrendingUp } from 'react-icons/fi';

export default function PopularityWidget({ selectedCategory, onSelect }) {
  const categories = [
    { id: 'mainstream', label: 'Mainstream', range: [80, 100], desc: 'Top hits del momento' },
    { id: 'popular', label: 'Popular', range: [50, 79], desc: 'Canciones conocidas' },
    { id: 'underground', label: 'Underground', range: [0, 49], desc: 'Joyas escondidas' },
    { id: 'all', label: 'Todos', range: [0, 100], desc: 'Sin filtro de popularidad' }
  ];

  const selectCategory = (category) => {
    onSelect(category);
  };

  const isSelected = (category) => {
    return selectedCategory?.id === category.id;
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiTrendingUp className="text-[#1DB954]" />
        Popularidad
      </h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => selectCategory(category)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              isSelected(category)
                ? 'bg-[#1DB954] text-black'
                : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold ${isSelected(category) ? 'text-black' : 'text-white'}`}>
                  {category.label}
                </p>
                <p className={`text-xs ${isSelected(category) ? 'text-black/70' : 'text-zinc-400'}`}>
                  {category.desc}
                </p>
              </div>
              {isSelected(category) && (
                <span className="text-xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
