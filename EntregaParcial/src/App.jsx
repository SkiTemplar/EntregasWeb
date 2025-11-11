import { useState, useEffect } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import ShowGrid from './components/ShowGrid';
import ShowModal from './components/ShowModal';
import Favorites from './components/Favorites';
import Filters from './components/Filters';
import SortBar from './components/SortBar';
import { getAllShows, searchShows, getShowById } from './api/api';

function App() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [allGenres, setAllGenres] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Extraer géneros únicos de las series
  useEffect(() => {
    if (shows.length > 0) {
      const genres = new Set();
      shows.forEach((item) => {
        const show = item.show || item;
        if (show.genres) {
          show.genres.forEach((genre) => genres.add(genre));
        }
      });
      setAllGenres(Array.from(genres).sort());
    }
  }, [shows]);

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...shows];

    // Filtrar por género
    if (selectedGenre) {
      result = result.filter((item) => {
        const show = item.show || item;
        return show.genres && show.genres.includes(selectedGenre);
      });
    }

    // Ordenar por rating
    if (sortOrder) {
      result.sort((a, b) => {
        const showA = a.show || a;
        const showB = b.show || b;
        const ratingA = showA.rating?.average || 0;
        const ratingB = showB.rating?.average || 0;
        return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    }

    setFilteredShows(result);
  }, [shows, selectedGenre, sortOrder]);

  // Buscar series
  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchShows(query);
      setShows(results);
      setFilteredShows(results);
    } catch (error) {
      console.error('Error buscando series:', error);
    }
    setLoading(false);
  };

  // Mostrar detalle de serie
  const handleShowDetail = async (show) => {
    try {
      const detailedShow = await getShowById(show.id);
      setSelectedShow(detailedShow);
    } catch (error) {
      console.error('Error obteniendo detalle:', error);
    }
  };

  // Toggle favorito
  const handleToggleFavorite = (show) => {
    const isFavorite = favorites.some((fav) => fav.id === show.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== show.id));
    } else {
      setFavorites([...favorites, show]);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TVMaze Series</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app-main">
        <Favorites
          favorites={favorites}
          onShowDetail={handleShowDetail}
          onToggleFavorite={handleToggleFavorite}
        />

        {shows.length > 0 && (
          <div className="controls">
            <Filters
              genres={allGenres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
            <SortBar sortOrder={sortOrder} onSortChange={setSortOrder} />
          </div>
        )}

        {loading ? (
          <p className="loading">Cargando...</p>
        ) : filteredShows.length > 0 ? (
          <div className="results-section">
            <h2>Resultados ({filteredShows.length})</h2>
            <ShowGrid
              shows={filteredShows}
              onShowDetail={handleShowDetail}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        ) : shows.length === 0 ? (
          <div className="welcome">
            <h2>Busca tus series favoritas</h2>
            <p>Usa el buscador para encontrar series de TV</p>
          </div>
        ) : null}
      </main>

      {selectedShow && (
        <ShowModal
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.some((fav) => fav.id === selectedShow.id)}
        />
      )}
    </div>
  );
}

export default App;
