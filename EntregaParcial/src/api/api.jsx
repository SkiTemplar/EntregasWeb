// API de TVMaze - Funciones para obtener datos de series
const BASE_URL = 'https://api.tvmaze.com';

// Obtener todas las series
export const getAllShows = async () => {
  const response = await fetch(`${BASE_URL}/shows`);
  return await response.json();
};

// Obtener detalle de una serie por ID
export const getShowById = async (id) => {
  const response = await fetch(`${BASE_URL}/shows/${id}`);
  return await response.json();
};

// Buscar series por nombre
export const searchShows = async (query) => {
  const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  return await response.json();
};

