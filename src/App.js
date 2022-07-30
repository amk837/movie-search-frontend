import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ROUTES } from './constants';
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
        <Route exact path={ROUTES.login} element={<LoginPage />} />
        <Route exact path={ROUTES.register} element={<RegisterPage />} />
        <Route exact path={ROUTES.latest} element={<LatestMovies />} />
        <Route exact path={ROUTES.topRated} element={<TopRatedMovies />} />
        <Route exact path={ROUTES.popular} element={<PopularMovies />} />
        <Route path={ROUTES.movieDetail()} element={<MovieDetail />} />
        <Route exact path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.search} element={<SearchPage api={searchMovies} />} />
        <Route path={ROUTES.actorMovies()} element={<MoreMoviesBy api={searchMoviesByCast} />} />
        <Route path={ROUTES.directorMovies()} element={<MoreMoviesBy api={searchMoviesByDirector} />} />
        <Route path={ROUTES.genreMovies()} element={<MoreMoviesBy api={searchMoviesByGenre} />} />
        <Route path={ROUTES.favorites} element={<FavoritesPage />} />
        <Route path={ROUTES.rest} element={<>404 page not found</>} />
      </Routes>
    </>
  );
}

export default App;
