
export const API_OPTIONS ={
          method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  }
};
export const IMAGE_URL ="https://image.tmdb.org/t/p/original";
