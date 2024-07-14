import styled from '@emotion/styled';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, CircularProgress, FormControlLabel, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList';
import MovieReviews from '../../components/MovieReviews';
import { addToFavorites, getMovieDetail, getSimilarMovies, removeFromFavorites } from '../../services/movieService';
import FavoritesContext from '../../context/FavoritesContext';
import { getRefreshToken, getToken, verifyAuth } from '../../redux/nodes/entities/user/selectors';
import { useTokenService } from '../../services/authService';
import CastAndDirector from '../../components/CastAndDirector/CastAndDirector';
import { MEDIA_QUERIES } from '../../constants';
import MovieVideos from '../../components/MovieVideos/MovieVideos';

const Image = styled.img`
  border-radius: 20px;
  margin: 0.5%;
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 5px;
`;

const IconStyles = `
  width: 30px;
  height: 30px;
  margin: 10px;
  margin-left: 0;
`;

const Icon = styled.img`${IconStyles}`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: ${({ index }) => (index > 0 ? 5 : 0)}px;
  &: hover {
    text-decoration: underline;
  }
`;

const MovieDetailsContainer = styled(Stack)`
  width: 100%;
`;

const FavoriteIcon = styled(Favorite)`
  width: 100%;
  height: 100%;
`;

const FavoriteIconBorder = styled(FavoriteBorder)`
  width: 100%;
  height: 100%;
`;

const FavoriteBox = styled(Checkbox)`
  ${IconStyles}
  width: 40px;
  height: 40px;
  padding: 0px;
  color: white;
  &.Mui-checked {
    color: #00acc1;
  }
`;

const FavoriteBoxContainer = styled(FormControlLabel)`
  margin: 0px;
`;
export default function MovieDetail() {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);
  const id = parseInt(useParams().id, 10);

  const [isUpdating, setIsUpdating] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const isLoggedIn = useSelector(verifyAuth);

  const [movieDetails, setMovieDetails] = useState({ loading: true, found: false });

  const token = useSelector(getToken);
  const refreshToken = useSelector(getRefreshToken);

  const dispatch = useDispatch();

  const toggleFavorite = async () => {
    setIsUpdating(true);
    if (isFavorite(id)) {
      const data = await useTokenService(removeFromFavorites.bind(null, id), token, refreshToken, dispatch);
      if (data) removeFavorite(id);
    } else {
      const response = await useTokenService(addToFavorites.bind(null, movieDetails), token, refreshToken, dispatch);
      if (response) addFavorite(movieDetails);
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    getMovieDetail(id).then((movieData) => {
      setMovieDetails({ ...movieData, loading: false, found: true });
    }).catch((err) => {
      setMovieDetails({ loading: false, found: false, err });
    });
  }, [id]);
  return (
    <Stack color="#00acc1" key={id} flex={1}>
      {!movieDetails.loading && movieDetails.found && (
        <>
          <MovieVideos movieId={id} />
          <MovieDetailsContainer direction={isMobile ? 'column' : 'row'}>
            <Image src={movieDetails.img} width={isMobile ? '100%' : '25%'} height={isMobile ? '50%' : '50%'} alt={movieDetails.title} />
            <Stack width={isMobile ? '100%' : '70%'} margin={isMobile ? 0 : 3} overflow="hidden" pt={isMobile ? 1 : 0}>
              <Typography variant="h5">{movieDetails.title}</Typography>
              <Typography variant="subtitle1" color="#8e95a5" pt={isMobile ? 1 : 0}>
                {movieDetails.overview}
              </Typography>
              <DetailContainer>
                <Icon src="/star.png" alt="rating" title="rating" />
                <Typography variant="h6" margin="10px">
                  {movieDetails.rating}
                </Typography>
              </DetailContainer>
              <DetailContainer>
                <Icon src="/text.png" alt="runtime" title="duration" />
                <Typography variant="h6" margin="10px">{movieDetails.runtime}</Typography>
              </DetailContainer>
              {isLoggedIn && (
                <DetailContainer>
                  <FavoriteBoxContainer
                    disabled={isUpdating}
                    control={(
                      <FavoriteBox
                        icon={<FavoriteIconBorder />}
                        checkedIcon={<FavoriteIcon />}
                        checked={isFavorite(id)}
                        onChange={toggleFavorite}
                      />
                    )}
                    label={`Add${isFavorite(id) ? 'ed' : ''} To Favorites`}
                  />
                </DetailContainer>
              )}

              <DetailContainer>
                <Typography color="#8e95a5" width={80}>Release</Typography>
                <Typography>{movieDetails.releaseDate}</Typography>
              </DetailContainer>
              <DetailContainer>
                <Typography color="#8e95a5" width={80}>Genres</Typography>
                <Stack direction="row" flex={1} overflow={isMobile ? 'scroll' : undefined} pr={isMobile ? 2 : 0}>
                  {movieDetails.genres.map(({ name, id }, index) => (
                    <React.Fragment key={name}>
                      {index > 0 && ','}
                      <CustomLink to={`/genre/${id}/${name}`} index={index}>{name}</CustomLink>
                    </React.Fragment>
                  ))}
                </Stack>
              </DetailContainer>

              <CastAndDirector castAndDirector={[movieDetails.cast, movieDetails.director]} />
            </Stack>
          </MovieDetailsContainer>
          <MovieReviews id={id} key={id} />
          <MovieList api={getSimilarMovies(id)} title="similar" />
        </>
      )}

      {movieDetails.loading && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}

      {!movieDetails.loading && !movieDetails.found && (
        <MovieDetailsContainer>
          <Typography color="white" textAlign="center">Movie not found</Typography>
        </MovieDetailsContainer>
      )}
    </Stack>
  );
}
