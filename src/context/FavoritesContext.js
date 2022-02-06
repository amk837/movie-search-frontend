import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext({
  favoriteMovies: [],
  addFavorite: (movie) => this.favoriteMovies.concat(movie),
  removeFavorite: (movieId) => this.favoriteMovies.filter((movie) => movie.id !== movieId),
  isFavorite: (movieId) => this.favoriteMovies.some((movie) => movie.id !== movieId),
  refreshFavorites: () => {},
  setFavorites: () => {},
});

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (movie) => {
    if (favorites.includes(movie)) return;
    setFavorites((oldFavorites) => oldFavorites.concat(movie));
  };

  const removeFavorite = (id) => {
    setFavorites((oldFavorites) => (
      oldFavorites.filter((favorite) => id !== favorite.id)
    ));
  };

  const isFavorite = (id) => favorites.some((favorite) => id === favorite.id);

  const context = useMemo(() => ({
    favoriteMovies: favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    setFavorites,
  }), [favorites]);

  return <FavoritesContext.Provider value={context}>{children}</FavoritesContext.Provider>;
}

FavoritesContextProvider.defaultProps = {
  children: {},
};

FavoritesContextProvider.propTypes = {
  children: PropTypes.shape({}),
};

export default FavoritesContext;
