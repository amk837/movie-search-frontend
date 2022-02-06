import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import PropType from 'prop-types';

const Card = styled(Link)`
  min-width: 20%;
  max-width: 20%;
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
  font-size: 1vw;
  width: 90%;
`;

export default function PersonCard({ name, character, img, href }) {
  return (
    <Card to={href}>
      <Image src={img} alt={name} />

      <Title variant="subtitle2" title={name}>
        {name}
      </Title>

      {character && (
        <Title style={{ color: '#8e95a5' }} title={character}>
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
