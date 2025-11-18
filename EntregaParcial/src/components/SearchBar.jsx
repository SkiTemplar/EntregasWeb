import { useState } from 'react';

// Componente barra de búsqueda con búsqueda en tiempo real
function SearchBar({ onSearch, searchQuery }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar series en tiempo real..."
        value={searchQuery}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
