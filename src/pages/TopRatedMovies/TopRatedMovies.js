import React from 'react';
import { getTopRatedMovies } from '../../services/movieService';
import MovieList from '../../components/MovieList';

function TopRatedMovies() {
  return <MovieList api={getTopRatedMovies} title="top_rated" />;
}

export default TopRatedMovies;
