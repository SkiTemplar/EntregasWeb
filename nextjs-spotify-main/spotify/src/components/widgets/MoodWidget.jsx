'use client';

import { FiSmile, FiZap, FiHeart, FiMoon, FiSun, FiMusic } from 'react-icons/fi';

export default function MoodWidget({ selectedMoods, onSelect }) {
  const moods = [
    {
      id: 'happy',
      label: 'Feliz',
      icon: FiSmile,
      keywords: ['happy', 'feel good', 'upbeat', 'positive vibes', 'alegria']
    },
    {
      id: 'energetic',
      label: 'Energético',
      icon: FiZap,
      keywords: ['energy', 'workout', 'pump up', 'power', 'gym motivation']
    },
    {
      id: 'calm',
      label: 'Tranquilo',
      icon: FiMoon,
      keywords: ['calm', 'peaceful', 'meditation', 'ambient', 'relax']
    },
    {
      id: 'sad',
      label: 'Melancólico',
      icon: FiHeart,
      keywords: ['sad', 'melancholy', 'heartbreak', 'emotional', 'nostalgia']
    },
    {
      id: 'chill',
      label: 'Relajado',
      icon: FiSun,
      keywords: ['chill', 'lofi', 'study', 'coffee shop', 'laid back']
    },
    {
      id: 'party',
      label: 'Fiesta',
      icon: FiMusic,
      keywords: ['party', 'dance', 'club', 'fiesta', 'dance hits']
    },
    {
      id: 'romantic',
      label: 'Romántico',
      icon: FiHeart,
      keywords: ['romantic', 'love songs', 'ballads', 'romance', 'love']
    },
    {
      id: 'focus',
      label: 'Focus',
      icon: FiZap,
      keywords: ['focus', 'concentration', 'study music', 'instrumental', 'deep focus']
    }
  ];

  const toggleMood = (mood) => {
    const exists = selectedMoods.find(m => m.id === mood.id);
    if (exists) {
      onSelect(selectedMoods.filter(m => m.id !== mood.id));
    } else {
      // Solo permitir 2 moods a la vez
      if (selectedMoods.length >= 2) {
        onSelect([selectedMoods[1], mood]);
      } else {
        onSelect([...selectedMoods, mood]);
      }
    }
  };

  const isSelected = (mood) => {
    return selectedMoods.some(m => m.id === mood.id);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4 h-[280px] flex flex-col">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <FiSmile className="text-[#1DB954]" />
        Mood
      </h3>

      <div className="flex-1 grid grid-cols-2 gap-2 content-start">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood)}
              className={`flex items-center justify-center gap-2 text-sm px-2 py-2.5 rounded-lg transition-all ${
                isSelected(mood)
                  ? 'bg-[#1DB954] text-black font-bold'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              <Icon size={14} />
              {mood.label}
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-zinc-700 min-h-[32px]">
        {selectedMoods.length > 0 ? (
          <p className="text-zinc-400 text-xs">
            {selectedMoods.map(m => m.label).join(' + ')}
          </p>
        ) : (
          <p className="text-zinc-500 text-xs">Máximo 2 moods</p>
        )}
      </div>
    </div>
  );
}
