/* eslint-disable camelcase */
import {
  GET_CREDIT_API,
  GET_MOVIE_API,
  GET_REVIEWS_API,
  GET_SIMILAR_MOVIES_API,
  IMAGE_API_BASE,
  LATEST_MOVIES_API,
  POPULAR_MOVIES_API,
  TOP_RATED_MOVIES_API,
  SEARCH_MOVIES_API,
  SEARCH_BY_CAST_API,
  SEARCH_BY_DIRECTOR_API,
  SEARCH_BY_GENRE_API,
  GET_GENRES_API,
  GET_FAVORITES_API,
  ADD_TO_FAVORITES_API,
  REMOVE_FROM_FAVORITES_API,
  ROUTES,
} from '../constants';

const defaultHeader = {
  'Content-Type': 'application/json',
};

const getHeaders = (token = null) => (!token ? defaultHeader : { ...defaultHeader, Authorization: `BEARER ${token}` });

const extractData = (movie) => ({
  img: movie.poster_path && `${IMAGE_API_BASE}/w500${movie.poster_path}`,
  href: ROUTES.movieDetail(movie.id),
  title: movie.title,
  id: movie.id,
  genres: movie.genres,
  runtime: `${movie.runtime} min`,
  releaseDate: movie.release_date,
  rating: movie.vote_average,
  overview: movie.overview,
});

const getMovies = async (api, page = 1) => {
  try {
    const movies = await (await fetch(`${api}${page}`)).json();
    return {
      pages: movies.total_pages,
      movies: movies.results.map(extractData),
      page: movies.page,
    };
  } catch (error) {
    throw error.message;
  }
};

export const getLatestMovies = getMovies.bind(null, LATEST_MOVIES_API);

export const getTopRatedMovies = getMovies.bind(null, TOP_RATED_MOVIES_API);

export const getPopularMovies = getMovies.bind(null, POPULAR_MOVIES_API);

export const getMovieDetail = async (id) => {
  const movieData = await (await fetch(GET_MOVIE_API.replace('id', id))).json();
  const movieCast = await (
    await fetch(GET_CREDIT_API.replace('id', id))
  ).json();
  const [cast, director] = [
    movieCast.cast.map(({ name, profile_path, character, id }) => ({
      name,
      img: profile_path && `${IMAGE_API_BASE}/w185${profile_path}`,
      character,
      href: ROUTES.actorMovies(id, name),
    })),
    movieCast.crew
      .filter((person) => person.job === 'Director')
      .map(({ name, profile_path, id }) => ({
        name,
        img: profile_path && `${IMAGE_API_BASE}/w185${profile_path}`,
        href: ROUTES.directorMovies(id, name),
      })),
  ];
  return {
    ...extractData(movieData),
    cast,
    director,
  };
};

export const getSimilarMovies = (id) => getMovies.bind(null, GET_SIMILAR_MOVIES_API.replace('id', id));

const extractReviewData = ({
  author_details: { username, avatar_path },
  content,
  updated_at,
}) => ({
  name: username,
  review: content,
  avatar:
    avatar_path && avatar_path.startsWith('/https')
      ? avatar_path.slice(1)
      : `${IMAGE_API_BASE}/w185${avatar_path}`,
  date: updated_at,
});

export const getReviews = async (id, page = 1) => {
  const reviews = await (
    await fetch(`${GET_REVIEWS_API.replace('id', id)}${page}`)
  ).json();
  return {
    pages: reviews.total_pages,
    reviews: reviews.results.map((review) => extractReviewData(review)),
  };
};

export const searchMovies = (filters) => async (page) => {
  const movies = await (
    await fetch(SEARCH_MOVIES_API, {
      method: 'SEARCH',
      body: JSON.stringify({ ...filters, page }),
      headers: getHeaders(),
    })
  ).json();
  return {
    pages: movies.total_pages,
    movies: movies.results.map((movie) => extractData(movie)),
    page: movies.page,
  };
};

export const searchMoviesByCast = (personId) => getMovies.bind(null, SEARCH_BY_CAST_API.replace('id', personId));

export const searchMoviesByDirector = (personId) => getMovies.bind(null, SEARCH_BY_DIRECTOR_API.replace('id', personId));

export const searchMoviesByGenre = (genreId) => getMovies.bind(null, SEARCH_BY_GENRE_API.replace('id', genreId));

export const getGenres = async () => {
  const res = (await fetch(GET_GENRES_API));
  const genres = await res.json();
  return genres;
};

export const getFavorites = async (token) => {
  const res = await fetch(GET_FAVORITES_API, {
    headers: getHeaders(token),
  });
  if (res.status >= 200 && res.status <= 204) return res.json();
  throw res;
};

export const addToFavorites = (movie, token) => fetch(ADD_TO_FAVORITES_API, {
  method: 'POST',
  body: JSON.stringify({ movie }),
  headers: getHeaders(token),
})
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });

export const removeFromFavorites = (movieId, token) => fetch(REMOVE_FROM_FAVORITES_API, {
  method: 'DELETE',
  body: JSON.stringify({ movieId }),
  headers: getHeaders(token),
})
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });
