import styled from '@emotion/styled';
import { Pagination, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_QUERIES } from '../../constants';

const StyledPagination = styled(Pagination)`
  .MuiPagination-textPrimary {
    color: white;
  }
  .MuiButtonBase-root { 
    color: white;
  }
`;

export default function CustomPagination({ page, pages, onPageChange }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  return (
    <StyledPagination
      page={page}
      count={pages}
      siblingCount={isMobile ? 1 : 2}
      hideNextButton
      hidePrevButton
      color="primary"
      shape="rounded"
      size="large"
      variant="text"
      onChange={onPageChange}
    />
  );
}

CustomPagination.defaultProps = {
  pages: 1,
  page: undefined,
  onPageChange: () => {},
};

CustomPagination.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
};
