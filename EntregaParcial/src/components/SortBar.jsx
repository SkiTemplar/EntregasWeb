// Componente para ordenar series por rating
function SortBar({ sortOrder, onSortChange }) {
  return (
    <div className="sort-bar">
      <label>Ordenar por rating: </label>
      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sin ordenar</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
      </select>
    </div>
  );
}

export default SortBar;

