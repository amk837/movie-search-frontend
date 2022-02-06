import React from 'react';
import { getPopularMovies } from '../../services/movieService';
import MovieList from '../../components/MovieList';

function PopularMovies() {
  return <MovieList api={getPopularMovies} title="popular" />;
}

export default PopularMovies;
