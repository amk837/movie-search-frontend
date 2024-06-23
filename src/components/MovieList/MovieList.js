import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { bool } from 'prop-types';
import styled from '@emotion/styled';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import MovieCard from '../MovieCard';
import CustomPagination from '../CustomPagination';
import MovieCardSkeleton from '../MovieCard/skeleton';
import { MEDIA_QUERIES } from '../../constants';

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  .MuiPagination-textPrimary {
    color: white;
  }
  .css-1bfr02t { 
    color: white;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px 16px;
  }
`;

const TitleContainer = styled(Typography)`
  margin: 10px;
  color: #00acc1;
  text-align: left;
  border-radius: 5px;
`;

const DUMMY_CARDS = Array(20).fill(0).map((_, index) => index);

function MovieList({ api, title, moviesList, showLoader }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  const [movies, setMovies] = useState(moviesList || []);
  const [totalPages, setTotalPages] = useState(moviesList ? moviesList.length : 0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(showLoader);

  const loadMovies = (page) => {
    if (!isLoading) {
      setIsLoading(true);
    }

    setPage(page);
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
        <Link to={`/${title}`} style={{ textDecoration: 'none' }}>
          <TitleContainer variant="h6">{`${title.toUpperCase().replaceAll('_', ' ')} MOVIES`}</TitleContainer>
        </Link>
      )}

      <Stack direction="row" flexWrap={isMobile ? 'nowrap' : 'wrap'} overflow={isMobile ? 'scroll' : undefined}>
        {isLoading || !movies.length ? (
          DUMMY_CARDS.map((key) => <MovieCardSkeleton key={key} />)
        ) : (
          movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        )}
      </Stack>

      {!isLoading && !movies.length ? <Typography color="white">No movies found</Typography> : null}

      <Stack alignItems="center" pt={2}>
        {totalPages > 0 ? (
          <CustomPagination
            pages={totalPages}
            onPageChange={onPageChange}
            page={page}
          />
        ) : null}
      </Stack>
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
