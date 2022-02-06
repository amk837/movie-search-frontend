/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';

const movies = [
  {
    img: 'https://www.image.com/movie1.jpg',
    title: 'movie 1',
    href: '/movie/1',
    id: 1,
  },
  {
    img: 'https://www.image.com/movie2.jpg',
    title: 'movie 2',
    href: '/movie/2',
    id: 2,
  },
  {
    img: 'https://www.image.com/movie3.jpg',
    title: 'movie 3',
    href: '/movie/3',
    id: 3,
  },
];

const mockApiReturn = {
  page: 1,
  total_pages: 1,
  results: movies,
};

const mockApi = jest.fn(async () => mockApiReturn);

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render movie cards', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<MovieList moviesList={movies} title="special" />}
          />
        </Routes>
      </BrowserRouter>,
    );

    expect(screen.getByText('SPECIAL MOVIES')).toBeInTheDocument();

    screen.queryAllByRole('link').forEach((movieCard, index) => {
      expect(movieCard.href).toBe(`http://localhost${movies[index].href}`);
      expect(movieCard.children[0].src).toBe(movies[index].img);
      expect(movieCard.children[1].textContent).toBe(movies[index].title);
    });
  });

  it('should render movie cards using api', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<MovieList api={mockApi} title="api" />}
            />
          </Routes>
        </BrowserRouter>,
      );
    });

    await act(async () => mockApi);

    expect(screen.getByText('API MOVIES')).toBeInTheDocument();

    screen.queryAllByRole('link').forEach((movieCard, index) => {
      expect(movieCard.href).toBe(`http://localhost${movies[index].href}`);
      expect(movieCard.children[0].src).toBe(movies[index].img);
      expect(movieCard.children[1].textContent).toBe(movies[index].title);
    });
  });

  it('should render  no movies found', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<MovieList moviesList={[]} title="no" />}
            />
          </Routes>
        </BrowserRouter>,
      );
    });

    expect(screen.getByText('NO MOVIES')).toBeInTheDocument();

    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });
});
