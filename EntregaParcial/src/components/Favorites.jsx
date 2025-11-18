import ShowCard from './ShowCard';

// Componente sección de favoritos
function Favorites({ favorites, onShowDetail, onToggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-section">
        <h2>Mis Favoritos</h2>
        <p className="no-favorites">No hay series favoritas</p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h2>Mis Favoritos ({favorites.length})</h2>
      <div className="show-grid">
        {favorites.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onShowDetail={onShowDetail}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;

