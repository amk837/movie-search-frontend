import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import HomePage from './pages/HomePage';
import LatestMovies from './pages/LatestMovies/LatestMovies';
import LoginPage from './pages/LoginPage';
import MoreMoviesBy from './pages/MoreMoviesBy';
import MovieDetail from './pages/MovieDetail';
import PopularMovies from './pages/PopularMovies';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import TopRatedMovies from './pages/TopRatedMovies';
import { searchMovies, searchMoviesByCast, searchMoviesByDirector, searchMoviesByGenre } from './services/movieService';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/latest" element={<LatestMovies />} />
        <Route exact path="/top_rated" element={<TopRatedMovies />} />
        <Route exact path="/popular" element={<PopularMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/" element={<SearchPage api={searchMovies} />} />
        <Route path="/actor/:query/:name" element={<MoreMoviesBy api={searchMoviesByCast} />} />
        <Route path="/director/:query/:name" element={<MoreMoviesBy api={searchMoviesByDirector} />} />
        <Route path="/genre/:query/:name" element={<MoreMoviesBy api={searchMoviesByGenre} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<>404 page not found</>} />
      </Routes>
    </>
  );
}

export default App;
