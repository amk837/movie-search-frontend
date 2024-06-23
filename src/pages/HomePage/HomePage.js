import React from 'react';
import { Stack } from '@mui/material';
import LatestMovies from '../LatestMovies/LatestMovies';
import PopularMovies from '../PopularMovies';
import TopRatedMovies from '../TopRatedMovies';

export default function HomePage() {
  return (
    <Stack>
      <LatestMovies />
      <TopRatedMovies />
      <PopularMovies />
    </Stack>
  );
}
