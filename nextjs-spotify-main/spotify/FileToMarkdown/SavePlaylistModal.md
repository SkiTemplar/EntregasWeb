'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function SavePlaylistModal({ isOpen, onClose, onSave, loading }) {
const [name, setName] = useState('');

if (!isOpen) return null;

const handleSave = () => {
if (!name.trim()) {
alert('Escribe un nombre para la playlist');
return;
}
onSave(name.trim());
setName('');
};

return (
<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
<div className="bg-[#282828] rounded-lg p-6 w-full max-w-md mx-4">
<div className="flex items-center justify-between mb-4">
<h2 className="text-white text-xl font-bold">Guardar en Spotify</h2>
<button onClick={onClose} className="text-zinc-400 hover:text-white">
<FiX className="text-2xl" />
</button>
</div>

        <p className="text-zinc-400 text-sm mb-4">
          La playlist se guardara en tu cuenta de Spotify
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la playlist..."
          className="w-full bg-[#181818] text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          autoFocus
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-zinc-600 text-white font-bold py-2 px-4 rounded-full hover:border-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-2 px-4 rounded-full disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
);
}

