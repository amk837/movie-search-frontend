/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const movie = {
  href: '/movie1',
  title: 'movie 1',
  img: 'https://www.image.com/movie1.jpg',
};

describe('MovieCard', () => {
  it('should render a movie card', () => {
    render((
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MovieCard movie={movie} />} />
        </Routes>
      </BrowserRouter>
    ));
    const movieCard = screen.getByRole('link');

    expect(movieCard.href).toBe(`http://localhost${movie.href}`);
    expect(movieCard.children[0].src).toBe(movie.img);
    expect(movieCard.children[1].textContent).toBe(movie.title);
  });

  it('should render a dummy card', () => {
    render((
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MovieCard />} />
        </Routes>
      </BrowserRouter>
    ));

    const movieCard = screen.getByRole('link');

    expect(movieCard.href).toBe('http://localhost/');
    expect(movieCard.children[0].src).toBe('http://localhost/');
    expect(movieCard.children[1].textContent).toBe('');
  });
});
