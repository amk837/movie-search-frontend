import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../services/movieService';
import CustomPagination from '../CustomPagination';

const ReviewTextContainer = styled(Typography)`
  border: solid 10px;
  border-color: #8e95a5;
  border-radius: 0px 10px 10px 0px;
  color: white;
  padding: 10px;
  width: 80%;
`;

const ReviewerDetailsContainer = styled(Stack)`
  align-items: center;
  border: solid 10px;
  border-color: #8e95a5;
  border-radius: 10px 0px 0px 10px;
  justify-content: center;
  width: 20%;
`;

const ReviewContainer = styled(Stack)`
  background: 1d1d1d;
  flex-direction: row;
  margin: 10px;
  width: 79%;
`;

const HeadingContainer = styled(Typography)`
  align-self: flex-start;
  margin-left: 10.75%;
`;

const MainContainer = styled(Stack)`
  align-items: center;
  justify-content: center
`;
export default function MovieReviews() {
  const { id } = useParams();

  const [state, setState] = useState({ loading: true, pages: 5, reviews: [] });

  const loadReviews = (page) => {
    getReviews(id, page).then((reviews) => {
      setState({ ...state, ...reviews, loading: false });
    });
  };

  const onPageChange = (e, page) => {
    loadReviews(page);
  };

  useEffect(() => {
    loadReviews(1);
  }, []);
  return (
    <MainContainer>
      <HeadingContainer variant="h6">REVIEWS</HeadingContainer>

      {state.loading && <CircularProgress />}

      {!state.loading && state.reviews.map(({ name, avatar, review }) => (
        <ReviewContainer key={name} data-testid="reviews">
          <ReviewerDetailsContainer>
            <img src={avatar} alt="NA" width="50%" />

            <Typography>{name}</Typography>
          </ReviewerDetailsContainer>

          <ReviewTextContainer>{review}</ReviewTextContainer>
        </ReviewContainer>
      ))}

      {!state.loading && state.reviews.length === 0 && (
        <Typography color="white">No reviews found</Typography>
      )}

      {state.pages > 1 && <CustomPagination pages={state.pages} onPageChange={onPageChange} />}
    </MainContainer>
  );
}
