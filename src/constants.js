const AUTH_API_BASE = process.env.REACT_APP_AUTH_API_DOMAIN;
export const LOGIN_API = `${AUTH_API_BASE}/login`;
export const REGISTER_API = `${AUTH_API_BASE}/register`;
export const REFRESH_TOKEN_API = `${AUTH_API_BASE}/token`;
export const LOGOUT_API = `${AUTH_API_BASE}/logout`;

const API_KEY = process.env.REACT_APP_API_KEY;
const MOVIE_API_BASE = process.env.REACT_APP_MOVIE_API_DOMAIN;
export const LATEST_MOVIES_API = `${MOVIE_API_BASE}/upcoming?api_key=${API_KEY}&page=`;
export const TOP_RATED_MOVIES_API = `${MOVIE_API_BASE}/top_rated?api_key=${API_KEY}&page=`;
export const POPULAR_MOVIES_API = `${MOVIE_API_BASE}/popular?api_key=${API_KEY}&page=`;
export const GET_MOVIE_API = `${MOVIE_API_BASE}/id?api_key=${API_KEY}`;
export const GET_CREDIT_API = `${MOVIE_API_BASE}/id/credits?api_key=${API_KEY}`;
export const GET_SIMILAR_MOVIES_API = `${MOVIE_API_BASE}/id/similar?api_key=${API_KEY}&page=`;
export const GET_REVIEWS_API = `${MOVIE_API_BASE}/id/reviews?api_key=${API_KEY}&page=`;

export const SEARCH_MOVIES_API = process.env.REACT_APP_SEARCH_API_DOMAIN;

const FILTERED_SEARCH_API_BASE = process.env.REACT_APP_FILTERED_SEARCH_API_DOMAIN;
export const SEARCH_BY_CAST_API = `${FILTERED_SEARCH_API_BASE}?api_key=${API_KEY}&with_cast=id&page=`;
export const SEARCH_BY_DIRECTOR_API = `${FILTERED_SEARCH_API_BASE}?api_key=${API_KEY}&with_crew=id&page=`;
export const SEARCH_BY_GENRE_API = `${FILTERED_SEARCH_API_BASE}?api_key=${API_KEY}&with_genres=id&page=`;

export const IMAGE_API_BASE = process.env.REACT_APP_IMAGE_API_DOMAIN;

export const GET_GENRES_API = process.env.REACT_APP_GET_GENRES_API_DOMAIN;

export const FAVORITES_API_BASE = process.env.REACT_APP_FAVORITES_API_DOMAIN;

export const ADD_TO_FAVORITES_API = `${FAVORITES_API_BASE}/addToFavorites`;

export const GET_FAVORITES_API = `${FAVORITES_API_BASE}/getFavorites`;

export const REMOVE_FROM_FAVORITES_API = `${FAVORITES_API_BASE}/removeFromFavorites`;

export const ROUTES = {
  login: '/login',
  register: '/register',
  latest: '/latest',
  topRated: '/top_rated',
  popular: '/popular',
  movieDetail: (id = ':id') => `/movie/${id}`,
  home: '/',
  search: '/search',
  actorMovies: (query = ':query', name = ':name') => `/actor/${query}/${name}`,
  directorMovies: (query = ':query', name = ':name') => `/director/${query}/${name}`,
  genreMovies: (query = ':query', name = ':name') => `/genre/${query}/${name}`,
  favorites: '/favorites',
  rest: '*',
};

export const MIN_DESKTOP_WIDTH = 900;
export const MEDIA_QUERIES = {
  isMobile: `(max-width:${MIN_DESKTOP_WIDTH}px)`,
  isMidScreen: '(max-width:1200px)',
};
