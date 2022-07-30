import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import { arrayOf, shape } from 'prop-types';
import React from 'react';
import PersonCard from '../PersonCard/PersonCard';

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 5px;
`;

export default function CastAndDirector({ castAndDirector }) {
  return (
    <>
      {castAndDirector.map((people, index) => (
        <DetailContainer key={index}>
          <Typography color="#8e95a5" width="20%">
            {index === 0 ? 'Cast' : 'Director'}
          </Typography>
          <Stack flexDirection="row" width="80%" overflow="auto hidden">
            {people.map((person) => (
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              <PersonCard {...person} key={person.name} />
            ))}
          </Stack>
        </DetailContainer>
      ))}
    </>
  );
}

CastAndDirector.defaultProps = {
  castAndDirector: [[]],
};

CastAndDirector.propTypes = {
  castAndDirector: arrayOf(arrayOf(shape({}))),
};
