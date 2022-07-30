import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../../components/MovieList';
import FavoritesContext from '../../context/FavoritesContext';
import { getRefreshToken, getToken } from '../../redux/nodes/entities/user/selectors';
import { useTokenService } from '../../services/authService';
import { getFavorites } from '../../services/movieService';

export default function FavoritesPage() {
  const { favoriteMovies, setFavorites } = useContext(FavoritesContext);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(getToken);

  const refreshToken = useSelector(getRefreshToken);

  const dispatch = useDispatch();

  useEffect(async () => {
    const { favorites } = await useTokenService(getFavorites, token, refreshToken, dispatch);
    setFavorites(favorites);
    setIsLoading(false);
  }, []);

  return <MovieList key={favoriteMovies} showLoader={isLoading} moviesList={favoriteMovies} title="favorite" />;
}
