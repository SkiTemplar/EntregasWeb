// Componente para filtrar series por género
function Filters({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="filters">
      <label>Filtrar por género: </label>
      <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">Todos</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;

