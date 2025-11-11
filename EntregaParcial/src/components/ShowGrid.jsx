import ShowCard from './ShowCard';

// Componente grid de series
function ShowGrid({ shows, onShowDetail, onToggleFavorite, favorites }) {
  return (
    <div className="show-grid">
      {shows.map((item) => {
        const show = item.show || item;
        return (
          <ShowCard
            key={show.id}
            show={show}
            onShowDetail={onShowDetail}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === show.id)}
          />
        );
      })}
    </div>
  );
}

export default ShowGrid;

