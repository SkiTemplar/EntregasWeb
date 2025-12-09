'use client';

import { FiRefreshCw, FiSave } from 'react-icons/fi';
import { FaMusic } from 'react-icons/fa';
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ playlist, favorites, onRemove, onToggleFavorite, onRefresh, onSave }) {
if (playlist.length === 0) {
return (
<div className="bg-[#181818] rounded-lg p-8 text-center">
<FaMusic className="text-zinc-600 text-5xl mx-auto mb-4" />
<p className="text-zinc-400">
Selecciona artistas o generos y genera tu playlist
</p>
</div>
);
}

return (
<div className="bg-[#181818] rounded-lg p-4">
{/* Header */}
<div className="flex items-center justify-between mb-4">
<h3 className="text-white font-bold text-lg">
Tu Playlist ({playlist.length} canciones)
</h3>
<div className="flex items-center gap-2">
{/* Botón de guardar en Spotify */}
<button
onClick={onSave}
className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-2 px-4 rounded-full transition-colors"
>
<FiSave />
<span className="hidden sm:inline">Guardar en Spotify</span>
</button>
{/* Botón de regenerar playlist */}
<button
onClick={onRefresh}
className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors p-2"
>
<FiRefreshCw />
</button>
</div>
</div>

      {/* Lista de tracks */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {playlist.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isFavorite={favorites.some(f => f.id === track.id)}
            onRemove={onRemove}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
);
}
