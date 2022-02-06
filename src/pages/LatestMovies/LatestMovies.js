import React from 'react';
import { getLatestMovies } from '../../services/movieService';
import MovieList from '../../components/MovieList';

function LatestMovies() {
  return <MovieList api={getLatestMovies} title="latest" />;
}

export default LatestMovies;
