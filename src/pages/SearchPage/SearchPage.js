import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material/';
import { Search } from '@mui/icons-material';
import MovieList from '../../components/MovieList';
import SearchFilters from '../../components/SearchFilters';
import { MEDIA_QUERIES } from '../../constants';

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
  },
});

const MainContainer = styled(Stack)`
  align-items: center;
  height: 80%;
  color: #00acc1;
`;

// const SearchBar = styled(Autocomplete)`
//   width: 70%;
//   height: 100%;
//   align-items: center;
//   justify-content: center;
//   background: white;
//   border-radius: 10px 0px 0px 10px;
// `;

const SearchButton = styled(Button)`
  background: #00acc1;
  color: white;
  border-radius: 0px 10px 10px 0px;
  &: hover {
    background: #00acc1;
    opacity: 0.7;
  }
`;

export default function SearchPage({ api }) {
  const searchBarRef = useRef();

  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);

  const [filters, setFilters] = useState({
    sortBy: 'release_date',
    rating: 12,
    popularity: 12,
    genres: [],
    title: '',
    asc: -1,
    release_date: { from: '1900', to: `${new Date().getFullYear()}` },
  });

  const onSearch = () => {
    setFilters({ ...filters, title: searchBarRef.current.value });
  };

  return (
    <MainContainer>
      <Typography variant={isMobile ? 'h3' : 'h2'} py={4}>
        Search Movies
      </Typography>

      <Stack direction="row" sx={{ backgroundColor: 'white' }} borderRadius={3} width={isMobile ? '84%' : '50%'}>

        <SimpleTextField
          name="query"
          inputRef={searchBarRef}
          fullWidth
          onKeyDown={(event) => event.code === 'Enter' && onSearch()}
          placeholder="Search for movie"
        />

        <SearchButton onClick={onSearch}>
          <Search />
        </SearchButton>
      </Stack>

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
