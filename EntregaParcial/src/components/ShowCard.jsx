// Componente tarjeta de serie
function ShowCard({ show, onShowDetail, onToggleFavorite, isFavorite }) {
  // Manejar correctamente las imágenes
  const getImageUrl = () => {
    if (show.image) {
      return show.image.medium || show.image.original || 'https://via.placeholder.com/210x295?text=No+Image';
    }
    return 'https://via.placeholder.com/210x295?text=No+Image';
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/210x295?text=No+Image';
  };

  return (
    <div className="show-card">
      <img
        src={getImageUrl()}
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
