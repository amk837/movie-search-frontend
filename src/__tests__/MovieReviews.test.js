/* eslint-disable no-undef */
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import MovieReviews from '../components/MovieReviews';

const movieId = 550;

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: movieId }),
}));

const mockApiReturnEmpty = { page: 1, total_pages: 1, reviews: [] };

const mockApiReturnFull = {
  page: 1,
  total_pages: 1,
  reviews: [
    {
      avatar: 'https://www.image.com/reviewer1.jpg',
      name: 'reviewer1',
      review: 'review1',
    },
    {
      avatar: 'https://www.image.com/reviewer2.jpg',
      name: 'reviewer2',
      review: 'review2',
    },
    {
      avatar: 'https://www.image.com/reviewer3.jpg',
      name: 'reviewer3',
      review: 'review3',
    },
  ],
};

jest.mock('../services/movieService', () => ({
  __esModule: true,
  ...jest.requireActual('../services/movieService'),
  getReviews: jest.fn(),
}));

const { getReviews } = require('../services/movieService');

getReviews.mockResolvedValueOnce(mockApiReturnEmpty).mockResolvedValueOnce(mockApiReturnFull);

describe('MovieReviews', () => {
  it('Should render no reviews', async () => {
    render(<MovieReviews />);

    await act(async () => getReviews);
    expect(getReviews).toBeCalledWith(movieId, 1);
    expect(screen.getByText(/no reviews found/i)).toBeInTheDocument();
  });

  it('Should render reviews', async () => {
    render(<MovieReviews />);

    await act(async () => getReviews);

    expect(getReviews).toBeCalledWith(movieId, 1);
    expect(screen.queryByText(/no reviews found/i)).toBe(null);

    const reviewCard = screen.queryAllByTestId('reviews');

    reviewCard.forEach((review, index) => {
      expect(review.querySelector('img').src).toBe(mockApiReturnFull.reviews[index].avatar);
      expect(review.querySelectorAll('p')[0].textContent).toBe(mockApiReturnFull.reviews[index].name);
      expect(review.querySelectorAll('p')[1].textContent).toBe(mockApiReturnFull.reviews[index].review);
    });
  });
});
