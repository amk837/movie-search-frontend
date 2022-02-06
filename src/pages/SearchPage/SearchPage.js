import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import MovieList from '../../components/MovieList';
import SearchFilters from '../../components/SearchFilters';

const SimpleTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    border: '0px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '0px',
    },
    '&:hover fieldset': {
      border: '0px',
    },
    '&.Mui-focused fieldset': {
      border: '0px',
    },
    height: '100%',
    fontSize: '150%',
  },
});

const MainContainer = styled(Stack)`
  align-items: center;
  height: 80%;
  color: #00acc1;
`;

const SearchBar = styled(Autocomplete)`
  width: 70%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px 0px 0px 10px;
`;

const SearchButton = styled(Button)`
  background: #00acc1;
  color: white;
  width: 15%;
  height: 100%;
  border-radius: 0px 10px 10px 0px;
  &: hover {
    background: #00acc1;
    opacity: 0.7;
  }
`;

const SearchBarContainer = styled(MainContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 70px;
`;

export default function SearchPage({ api }) {
  const searchBarRef = useRef();

  const [filters, setFilters] = useState({
    sortBy: 'release_date',
    rating: 12,
    popularity: 12,
    genres: [],
    title: '',
    asc: -1,
    release_date: { from: '1900', to: `${new Date().getFullYear() + 3}` },
  });

  const onSearch = () => {
    setFilters({ ...filters, title: searchBarRef.current.value });
  };

  return (
    <MainContainer>
      <Typography variant="h2" margin="30px">
        Search Movies
      </Typography>

      <SearchBarContainer>
        <SearchBar
          freeSolo
          id="search-bar"
          disableClearable
          renderInput={(params) => (
            <SimpleTextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              name="query"
              inputRef={searchBarRef}
              onKeyDown={(event) => event.code === 'Enter' && onSearch()}
              inputProps={{ ...params.inputProps, type: 'search' }}
              placeholder="Search for movie"
            />
          )}
          options={[]}
        />

        <SearchButton onClick={onSearch}>
          <SearchIcon style={{ width: '100%', height: '100%' }} />
        </SearchButton>

      </SearchBarContainer>

      <SearchFilters setFilters={setFilters} filters={filters} />

      <MovieList api={api(filters)} title="Matched" />

    </MainContainer>
  );
}

SearchPage.defaultProps = {
  api: () => {},
};

SearchPage.propTypes = {
  api: PropTypes.func,
};
