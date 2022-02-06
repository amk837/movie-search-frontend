import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList';

export default function MoreMoviesBy({ api }) {
  const { query, name } = useParams();
  return <MovieList api={api(query)} title={name} />;
}

MoreMoviesBy.defaultProps = {
  api: () => {},
};

MoreMoviesBy.propTypes = {
  api: PropTypes.func,
};
