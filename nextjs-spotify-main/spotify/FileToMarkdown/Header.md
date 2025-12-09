'use client';

import { FaSpotify } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export default function Header({ onLogout }) {
return (
<header className="bg-[#181818] border-b border-[#282828] px-6 py-4">
<div className="max-w-7xl mx-auto flex items-center justify-between">
<div className="flex items-center gap-3">
<FaSpotify className="text-[#1DB954] text-3xl" />
<span className="text-white font-bold text-xl">Taste Mixer</span>
</div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span className="hidden sm:inline">Cerrar sesion</span>
        </button>
      </div>
    </header>
);
}

