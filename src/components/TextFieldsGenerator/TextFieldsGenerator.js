import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function TextFieldsGenerator({ fields, styles }) {
  return (
    <>
      {fields.map((field) => (
        <TextField
          key={field}
          style={styles}
          variant="outlined"
          label={`${field[0].toUpperCase()}${field.slice(1)}`}
          type={field}
          placeholder={`Enter ${field}`}
          name={field}
          required
          margin="dense"
        />
      ))}
    </>
  );
}

TextFieldsGenerator.defaultProps = {
  fields: [],
  styles: {},
};

TextFieldsGenerator.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.shape({}),
};
