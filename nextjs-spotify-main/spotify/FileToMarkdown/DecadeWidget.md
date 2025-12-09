'use client';

import {FiCalendar} from "react-icons/fi";

export default function DecadeWidget({ selectedDecades, onSelect }) {
const decades = [
{ label: '1950s', range: [1950, 1959] },
{ label: '1960s', range: [1960, 1969] },
{ label: '1970s', range: [1970, 1979] },
{ label: '1980s', range: [1980, 1989] },
{ label: '1990s', range: [1990, 1999] },
{ label: '2000s', range: [2000, 2009] },
{ label: '2010s', range: [2010, 2019] },
{ label: '2020s', range: [2020, 2029] }
];

    const toggleDecade = (decade) => {
        const exists = selectedDecades.find(d => d.label === decade.label);
        if (exists) {
            onSelect(selectedDecades.filter(d => d.label !== decade.label));
        } else {
            onSelect([...selectedDecades, decade]);
        }
    };

    const isSelected = (decade) => {
        return selectedDecades.some(d => d.label === decade.label);
    };

    return (
        <div className="bg-[#181818] rounded-lg p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FiCalendar className="text-[#1DB954]" />
                Décadas
            </h3>

            <div className="grid grid-cols-2 gap-2">
                {decades.map((decade) => (
                    <button
                        key={decade.label}
                        onClick={() => toggleDecade(decade)}
                        className={`text-sm px-3 py-2 rounded-lg transition-all ${
                            isSelected(decade)
                                ? 'bg-[#1DB954] text-black font-bold'
                                : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
                        }`}
                    >
                        {decade.label}
                    </button>
                ))}
            </div>

            {selectedDecades.length > 0 && (
                <div className="mt-3 pt-3 border-t border-zinc-700">
                    <p className="text-zinc-400 text-xs">
                        Seleccionadas: {selectedDecades.map(d => d.label).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
}
