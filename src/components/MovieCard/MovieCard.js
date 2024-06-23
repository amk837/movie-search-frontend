import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { MIN_DESKTOP_WIDTH } from '../../constants';

const Card = styled(Link)`
  width: 20%;
  height: 25vw;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width:${MIN_DESKTOP_WIDTH}px) {
    width: 200px;
    height: 300px;
    flex-shrink: 0;
  }
`;

const Image = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 10px;
`;

const Title = styled(Typography)`
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  width: 90%;
  height: 10%;
`;

export default function MovieCard({ movie: { img, title, href } }) {
  return (
    <Card to={href}>
      <Image src={img || '/movie-image-placeholder.png'} alt={title} />

      <Title title={title}>{title}</Title>
    </Card>
  );
}

MovieCard.defaultProps = {
  movie: {
    img: '',
    title: '',
    href: '',
  },
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    href: PropTypes.string,
  }),
};
