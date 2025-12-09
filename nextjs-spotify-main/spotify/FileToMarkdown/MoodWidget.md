'use client';

import { FiSmile, FiZap, FiHeart, FiMoon } from 'react-icons/fi';

export default function MoodWidget({ selectedMoods, onSelect }) {
const moods = [
{
id: 'happy',
label: 'Feliz',
icon: FiSmile,
params: { valence: [0.7, 1.0], energy: [0.6, 1.0] }
},
{
id: 'energetic',
label: 'Energético',
icon: FiZap,
params: { energy: [0.8, 1.0], danceability: [0.6, 1.0] }
},
{
id: 'calm',
label: 'Tranquilo',
icon: FiMoon,
params: { energy: [0.0, 0.4], acousticness: [0.4, 1.0] }
},
{
id: 'sad',
label: 'Melancólico',
icon: FiHeart,
params: { valence: [0.0, 0.4], energy: [0.0, 0.5] }
},
{
id: 'chill',
label: 'Relajado',
icon: FiMoon,
params: { energy: [0.3, 0.6], acousticness: [0.3, 0.8] }
},
{
id: 'party',
label: 'Fiesta',
icon: FiZap,
params: { danceability: [0.7, 1.0], energy: [0.7, 1.0], valence: [0.6, 1.0] }
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
<div className="bg-[#181818] rounded-lg p-4">
<h3 className="text-white font-bold mb-3 flex items-center gap-2">
<FiSmile className="text-[#1DB954]" />
Mood
</h3>

      <div className="grid grid-cols-2 gap-2">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood)}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all ${
                isSelected(mood)
                  ? 'bg-[#1DB954] text-black font-bold'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              <Icon size={16} />
              {mood.label}
            </button>
          );
        })}
      </div>

      {selectedMoods.length > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-700">
          <p className="text-zinc-400 text-xs">
            {selectedMoods.map(m => m.label).join(' + ')}
          </p>
        </div>
      )}

      <p className="text-zinc-500 text-xs mt-2">
        Máximo 2 moods simultáneos
      </p>
    </div>
);
}
