import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, CircularProgress, Dialog, Stack, Typography, useMediaQuery } from '@mui/material';
import { number } from 'prop-types';
import { getReviews } from '../../services/movieService';
import CustomPagination from '../CustomPagination';
import { MEDIA_QUERIES } from '../../constants';

const ReviewTextContainer = styled(Typography)`
  color: white;
  padding: 10px;
`;

const ReviewerDetailsContainer = styled(Stack)`
  align-items: center;
  justify-content: center;
`;

const ReviewContainer = styled(Stack)`
  background: #1e2129;
  border: solid 10px;
  border-color: #8e95a5;
  border-radius: 10px;
`;

const HeadingContainer = styled(Typography)`
  align-self: flex-start;
`;

const MainContainer = styled(Stack)`
  align-items: center;
  justify-content: center
`;
export default function MovieReviews({ id }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMidScreen);
  const [state, setState] = useState({ loading: true, pages: 5, reviews: [] });
  const [showReview, setShowReview] = useState(null);
  const [showDescriptionButton, setShowDescriptionButton] = useState({});

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
  }, [id]);
  return (
    <MainContainer>
      <HeadingContainer variant="h6" ml={isMobile ? 0 : '10.75%'}>REVIEWS</HeadingContainer>

      {state.loading && <CircularProgress />}

      {!state.loading && state.reviews.map(({ name, avatar, review }, index, arr) => (
        <ReviewContainer
          width={isMobile ? '100%' : '79%'}
          direction={isMobile ? 'column' : 'row'}
          m={isMobile ? 0 : 1.25}
          mt={isMobile ? 2 : 0}
          key={name}
          data-testid="reviews"
        >
          <ReviewerDetailsContainer width={isMobile ? '100%' : '20%'}>
            <img src={avatar || '/movie-image-placeholder.png'} alt="NA" width={isMobile ? '25%' : '50%'} />

            <Typography>{name}</Typography>
          </ReviewerDetailsContainer>

          <ReviewTextContainer
            height={showDescriptionButton[name] ? 200 : undefined}
            ref={(node) => {
              if (!node) return;
              const isLonger = node.clientHeight > 200;
              if (isLonger) setShowDescriptionButton({ ...showDescriptionButton, [name]: true });
            }}
            width={isMobile ? '100%' : '80%'}
            overflow={showDescriptionButton[name] ? 'hidden' : undefined}
            sx={{ WebkitLineClamp: showDescriptionButton[name] ? 8 : undefined, display: '-webkit-box', '-webkit-box-orient': 'vertical' }}
          >
            {review}
          </ReviewTextContainer>
          {showDescriptionButton[name] ? <Button onClick={() => setShowReview(arr[index])}>View full description</Button> : null}
        </ReviewContainer>
      ))}

      {!state.loading && state.reviews.length === 0 && (
        <Typography color="white">No reviews found</Typography>
      )}

      {state.pages > 1 && <CustomPagination pages={state.pages} onPageChange={onPageChange} />}

      {showReview ? (
        <Dialog open={!!showReview} onClose={() => setShowReview(null)} PaperProps={{ sx: { borderRadius: '10px' } }}>
          <ReviewContainer
            width={isMobile ? '100%' : '79%'}
            direction="column"
            key={showReview.name}
            data-testid="reviews"
            maxHeight={500}
            overflow="scroll"
          >
            <ReviewerDetailsContainer width={isMobile ? '100%' : '20%'}>
              <img src={showReview.avatar || '/movie-image-placeholder.png'} alt="NA" width={isMobile ? '25%' : '50%'} />

              <Typography color="#00acc1">{showReview.name}</Typography>
            </ReviewerDetailsContainer>

            <ReviewTextContainer width="100%">
              {showReview.review}
            </ReviewTextContainer>
          </ReviewContainer>
        </Dialog>
      ) : null}
    </MainContainer>
  );
}

MovieReviews.defaultProps = {
  id: 0,
};

MovieReviews.propTypes = {
  id: number,
};
