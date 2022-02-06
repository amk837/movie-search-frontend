import React from 'react';
import LatestMovies from '../LatestMovies/LatestMovies';
import PopularMovies from '../PopularMovies';
import TopRatedMovies from '../TopRatedMovies';

export default function HomePage() {
  return (
    <>
      <LatestMovies />
      <TopRatedMovies />
      <PopularMovies />
    </>
  );
}
