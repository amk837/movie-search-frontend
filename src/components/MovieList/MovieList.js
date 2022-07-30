import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { bool } from 'prop-types';
import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material';
import MovieCard from '../MovieCard';
import CustomPagination from '../CustomPagination';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiPagination-textPrimary {
    color: white;
  }
  .css-1bfr02t { 
    color: white;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;

const TitleContainer = styled(Typography)`
  margin: 10px;
  margin-left: 1.25%;
  color: #00acc1;
  text-align: left;
  border-radius: 5px;
`;

function MovieList({ api, title, moviesList, showLoader }) {
  const [movies, setMovies] = useState(moviesList || []);
  const [totalPages, setTotalPages] = useState(moviesList ? moviesList.length : 0);
  const [isLoading, setIsLoading] = useState(showLoader);

  const loadMovies = (page) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    api(page).then((data) => {
      setMovies(data.movies);
      setTotalPages(data.pages);
      setIsLoading(false);
    });
  };
  const movieTypes = ['top_rated', 'popular', 'latest'];

  const onPageChange = (e, p) => {
    loadMovies(p);
  };

  useEffect(() => {
    if (!moviesList) {
      loadMovies(1);
      return () => {
        setMovies([]);
      };
    }
    return () => {};
  }, [api]);

  useEffect(() => {
    if (isLoading === showLoader) return;

    setIsLoading(showLoader);
  }, [showLoader]);

  return (
    <Container>
      {!movieTypes.includes(title) ? (
        <TitleContainer variant="h6" style={{ alignSelf: 'flex-start', marginLeft: '10.75%' }}>
          {`${title.toUpperCase().replaceAll('_', ' ')} MOVIES`}
        </TitleContainer>
      ) : (
        <Link to={`/${title}`} style={{ textDecoration: 'none', width: '80%', margin: 'auto' }}>
          <TitleContainer variant="h6">{`${title.toUpperCase().replaceAll('_', ' ')} MOVIES`}</TitleContainer>
        </Link>
      )}

      {isLoading && <CircularProgress />}

      {!isLoading && totalPages > 0 ? (
        <MoviesContainer>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MoviesContainer>
      ) : (
        !isLoading && <Typography color="white">No movies found</Typography>
      )}

      {!moviesList && totalPages > 0 && <CustomPagination pages={totalPages} onPageChange={onPageChange} />}
    </Container>
  );
}

MovieList.defaultProps = {
  api: () => {},
  title: '',
  moviesList: null,
  showLoader: false,
};

MovieList.propTypes = {
  api: PropTypes.func,
  title: PropTypes.string,
  moviesList: PropTypes.arrayOf(PropTypes.shape({})),
  showLoader: bool,
};

export default MovieList;
