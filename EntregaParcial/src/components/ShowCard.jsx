// Componente tarjeta de serie
function ShowCard({ show, onShowDetail, onToggleFavorite, isFavorite }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/210x295?text=No+Image';
  };

  return (
    <div className="show-card">
      <img
        src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
        alt={show.name}
        onClick={() => onShowDetail(show)}
        onError={handleImageError}
        className="show-image"
      />
      <div className="show-info">
        <h3 onClick={() => onShowDetail(show)}>{show.name}</h3>
        <button
          onClick={() => onToggleFavorite(show)}
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default ShowCard;

