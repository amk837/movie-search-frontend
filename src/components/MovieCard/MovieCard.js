import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  width: 20%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-size: 1vw;
  height: 10%;
`;

export default function MovieCard({ movie: { img, title, href } }) {
  return (
    <Card to={href}>
      <Image src={img} alt={title} />

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
