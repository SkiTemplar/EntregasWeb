const BASE_URL = 'https://api.tvmaze.com';

// Obtener todas las series con paginación (más series)
export const getAllShows = async () => {
  try {
    // TVMaze permite obtener series por página (hasta 250 por página)
    // Vamos a cargar varias páginas para tener más series
    const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const promises = pages.map(page =>
      fetch(`${BASE_URL}/shows?page=${page}`).then(res => res.json())
    );

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error cargando series:', error);
    // Si falla, intenta cargar solo la primera página
    const response = await fetch(`${BASE_URL}/shows`);
    return await response.json();
  }
};

export const getShowById = async (id) => {
  const response = await fetch(`${BASE_URL}/shows/${id}`);
  return await response.json();
};

export const searchShows = async (query) => {
  const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  return await response.json();
};
