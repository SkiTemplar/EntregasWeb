import { useState, useEffect } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import ShowGrid from './components/ShowGrid';
import ShowModal from './components/ShowModal';
import Favorites from './components/Favorites';
import Filters from './components/Filters';
import SortBar from './components/SortBar';
import { getAllShows, getShowById } from './api/api';
import useLocalStorage from './hook/useLocalStorage';

function App() {
  const [allShows, setAllShows] = useState([]); // Todas las series cargadas
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar todas las series al inicio
  useEffect(() => {
    const loadAllShows = async () => {
      setLoading(true);
      try {
        const data = await getAllShows();
        setAllShows(data);
        setShows(data);
        setFilteredShows(data);
      } catch (error) {
        console.error('Error cargando series:', error);
      }
      setLoading(false);
    };
    loadAllShows();
  }, []);

  // Extraer géneros únicos de las series
  useEffect(() => {
    if (allShows.length > 0) {
      const genres = new Set();
      allShows.forEach((show) => {
        if (show.genres) {
          show.genres.forEach((genre) => genres.add(genre));
        }
      });
      setAllGenres(Array.from(genres).sort());
    }
  }, [allShows]);

  // Búsqueda dinámica en tiempo real
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setShows(allShows);
    } else {
      const filtered = allShows.filter((show) =>
        show.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setShows(filtered);
    }
  }, [searchQuery, allShows]);

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...shows];

    // Filtrar por género
    if (selectedGenre) {
      result = result.filter((show) => {
        return show.genres && show.genres.includes(selectedGenre);
      });
    }

    // Ordenar por rating
    if (sortOrder) {
      result.sort((a, b) => {
        const ratingA = a.rating?.average || 0;
        const ratingB = b.rating?.average || 0;
        return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    }

    setFilteredShows(result);
  }, [shows, selectedGenre, sortOrder]);

  // Actualizar búsqueda en tiempo real
  const handleSearch = (query) => {
    setSearchQuery(query);
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
        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      </header>

      <main className="app-main">
        <Favorites
          favorites={favorites}
          onShowDetail={handleShowDetail}
          onToggleFavorite={handleToggleFavorite}
        />

        {allShows.length > 0 && (
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
          <p className="loading">Cargando series...</p>
        ) : filteredShows.length > 0 ? (
          <div className="results-section">
            <h2>Series ({filteredShows.length})</h2>
            <ShowGrid
              shows={filteredShows}
              onShowDetail={handleShowDetail}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        ) : (
          <div className="welcome">
            <h2>No se encontraron series</h2>
            <p>Intenta con otra búsqueda</p>
          </div>
        )}
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
