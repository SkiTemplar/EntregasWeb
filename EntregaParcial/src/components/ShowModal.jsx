import '../styles/modal.css';

// Componente modal para mostrar detalles de la serie
function ShowModal({ show, onClose, onToggleFavorite, isFavorite }) {
  if (!show) return null;

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Obtener la mejor imagen disponible
  const getImageUrl = () => {
    if (show.image) {
      return show.image.original || show.image.medium || 'https://via.placeholder.com/300x400?text=No+Image';
    }
    return 'https://via.placeholder.com/300x400?text=No+Image';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img
            src={getImageUrl()}
            alt={show.name}
            className="modal-image"
            onError={(e) => e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'}
          />
          <div className="modal-info">
            <h2>{show.name}</h2>
            <p><strong>Rating:</strong> {show.rating?.average || 'N/A'} ⭐</p>
            <p><strong>Géneros:</strong> {show.genres?.join(', ') || 'N/A'}</p>
            <p><strong>Idioma:</strong> {show.language || 'N/A'}</p>
            <p><strong>Estatus:</strong> {show.status || 'N/A'}</p>
            <p><strong>Estreno:</strong> {show.premiered || 'N/A'}</p>
            <button
              onClick={() => onToggleFavorite(show)}
              className={`modal-fav-btn ${isFavorite ? 'active' : ''}`}
            >
              {isFavorite ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
            </button>
          </div>
        </div>

        <div className="modal-body">
          <h3>Descripción</h3>
          <p>{show.summary ? stripHtml(show.summary) : 'Sin descripción disponible'}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
