import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import { MEDIA_QUERIES } from '../../constants';

const Card = styled(Link)`
  min-width: ${({ width }) => width};
  max-width: ${({ width }) => width};
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
`;

export default function PersonCard({ name, character, img, href }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  return (
    <Card to={href} width={isMobile ? '150px' : '20%'}>
      <Image src={img || '/movie-image-placeholder.png'} alt={name} />

      <Title variant="subtitle2" title={name}>
        {name}
      </Title>

      {character && (
        <Title variant="caption" style={{ color: '#8e95a5' }}>
          {`as ${character}`}
        </Title>
      )}
    </Card>
  );
}

PersonCard.defaultProps = {
  name: '',
  character: '',
  img: '',
  href: '',
};

PersonCard.propTypes = {
  name: PropType.string,
  character: PropType.string,
  img: PropType.string,
  href: PropType.string,
};
