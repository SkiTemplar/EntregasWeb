'use client';

import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

export default function TrackCard({ track, isFavorite, onRemove, onToggleFavorite }) {
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#181818] hover:bg-[#282828] rounded-lg transition-colors group">
      <img
        src={track.album?.images?.[0]?.url || '/placeholder.png'}
        alt={track.name}
        className="w-12 h-12 rounded object-cover"
      />

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{track.name}</p>
        <p className="text-zinc-400 text-xs truncate">
          {track.artists?.map(a => a.name).join(', ')}
        </p>
      </div>

      <span className="text-zinc-400 text-xs hidden sm:block">
        {formatDuration(track.duration_ms)}
      </span>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleFavorite(track)}
          className="p-2 hover:bg-[#3e3e3e] rounded-full"
        >
          {isFavorite ? (
            <FaHeart className="text-[#1DB954]" />
          ) : (
            <FiHeart className="text-zinc-400 hover:text-white" />
          )}
        </button>

        <button
          onClick={() => onRemove(track.id)}
          className="p-2 hover:bg-[#3e3e3e] rounded-full"
        >
          <FiTrash2 className="text-zinc-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

