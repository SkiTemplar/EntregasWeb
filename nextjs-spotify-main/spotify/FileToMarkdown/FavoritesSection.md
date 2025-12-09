'use client';

import { FiHeart, FiX } from 'react-icons/fi';
import { FaMusic } from 'react-icons/fa';

export default function FavoritesSection({ favorites, onRemove, onToggleFavorite }) {
if (favorites.length === 0) {
return (
<div className="bg-[#181818] rounded-lg p-4">
<h3 className="text-white font-bold mb-3 flex items-center gap-2">
<FiHeart className="text-[#1DB954]" />
Favoritos ({favorites.length})
</h3>
<div className="text-center py-6">
<FaMusic className="text-zinc-600 text-3xl mx-auto mb-2" />
<p className="text-zinc-400 text-sm">
Marca canciones como favoritas
</p>
</div>
</div>
);
}

return (
<div className="bg-[#181818] rounded-lg p-4">
<h3 className="text-white font-bold mb-3 flex items-center gap-2">
<FiHeart className="text-[#1DB954]" />
Favoritos ({favorites.length})
</h3>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {favorites.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-3 bg-[#282828] hover:bg-[#3e3e3e] p-2 rounded transition-colors group"
          >
            {/* Imagen */}
            <img
              src={track.album?.images?.[2]?.url || '/placeholder.png'}
              alt={track.name}
              className="w-10 h-10 rounded"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {track.name}
              </p>
              <p className="text-zinc-400 text-xs truncate">
                {track.artists?.map(a => a.name).join(', ')}
              </p>
            </div>

            {/* Botones */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(track)}
                className="text-[#1DB954] hover:text-[#1ed760] transition-colors opacity-0 group-hover:opacity-100"
                title="Quitar de favoritos"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
);
}

