import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const StyledPagination = styled(Pagination)`
  margin: 10px;
  font-size: 40px;
  .MuiPagination-textPrimary {
    color: white;
  }
  .css-1bfr02t { 
    color: white;
  }
`;
export default function CustomPagination({ pages, onPageChange }) {
  return (
    <StyledPagination
      count={pages}
      color="primary"
      shape="rounded"
      size="large"
      variant="text"
      onChange={onPageChange}
    />
  );
}

CustomPagination.defaultProps = {
  pages: 2,
  onPageChange: () => {},
};

CustomPagination.propTypes = {
  pages: PropTypes.number,
  onPageChange: PropTypes.func,
};
