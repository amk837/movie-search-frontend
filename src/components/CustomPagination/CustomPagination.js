import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function CustomPagination({ pages, onPageChange }) {
  return (
    <Pagination
      count={pages}
      color="primary"
      shape="rounded"
      size="large"
      sx={{ marginBottom: '10px' }}
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
