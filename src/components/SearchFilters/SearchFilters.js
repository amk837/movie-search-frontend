import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { CalendarToday, StarRate, Whatshot } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../../services/movieService';
import { MEDIA_QUERIES } from '../../constants';

const FiltersContainer = styled(Stack)`
  background: #2f3441;
  color: #ddd;
  border-radius: 10px;
`;

const FilterContainer = styled(Stack)`
  width: ${({ width }) => width || 20}%;
`;

const FilterHeading = styled(Typography)`
  margin: 10px 0px;
`;

const SortByFilterContainer = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 40px;

  width: 90%;
  background: ${({ selected }) => (selected ? '#00acc1' : 'transparent')};
  &: hover {
    background: #00acc1;
  }
`;

const TriangleShape = styled.div`
  background: #00acc1;
  content: '';
  width: 0px;
  height: 0px;
  border: solid 20px;
  border-color: #2f3441 #2f3441 #2f3441 #00acc1;
  display: ${({ show }) => (show ? 'inline' : 'none')};
`;

const RowContainer = styled(Stack)`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 5px 0px;
`;

const DropDown = styled(Select)`
  background: #fff;
  height: 40px;
  width: 80%;
`;

const CheckBoxContainer = styled(FormControlLabel)`
  margin: 0px;
  .MuiFormControlLabel-label {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SortByLabel = styled(Typography)`
  width: 90%;
  color: #ddd;
  margin: 0px 0px 0px 10px;
`;

const YearLabel = styled(Typography)`
  width: 100px;
  min-width: 100px;
  text-align: right;
`;

const popularityRanges = Array.from(Array(10)).map((value, index) => [
  index * 1000,
  (index + 1) * 1000,
]);
popularityRanges.push([0, 5000]);
popularityRanges.push([5000, 10000]);
popularityRanges.push([0, 10000]);

const ratingRanges = Array.from(Array(10)).map((value, index) => [
  index,
  index + 1,
]);
ratingRanges.push([0, 5]);
ratingRanges.push([5, 10]);
ratingRanges.push([0, 10]);

export default function SearchFilters({ filters, setFilters }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);
  const sortByFilters = [['vote_average', 'Rating', StarRate], ['release_date', 'Date', CalendarToday], ['popularity', 'Popularity', Whatshot]];

  const [sortByHover, setSortByHover] = useState('');
  const [allGenres, setAllGenres] = useState(['Action']);

  const onSortByChange = (field) => () => {
    setFilters({ ...filters, sortBy: field });
  };

  const onGenresChange = (genre) => () => {
    let { genres } = filters;
    if (genres.includes(genre)) {
      genres = genres.filter((gen) => gen !== genre);
    } else {
      genres.push(genre);
    }
    setFilters({ ...filters, genres });
  };

  const onRatingChange = (event) => {
    setFilters({ ...filters, rating: event.target.value });
  };

  const onYearChange = (event) => {
    setFilters({
      ...filters,
      release_date: {
        ...filters.release_date,
        [event.target.name]: event.target.value,
      },
    });
  };

  // const onPopularityChange = (event) => {
  //   setFilters({ ...filters, popularity: event.target.value });
  // };

  const onSortByHover = (field) => () => {
    setSortByHover(field);
  };

  const onSortByHoverExit = () => {
    setSortByHover('');
  };

  const onSortModeChange = () => {
    setFilters({ ...filters, asc: filters.asc * -1 });
  };

  useEffect(() => {
    onSortByChange(sortByFilters[1][0])();
    getGenres().then((data) => {
      setAllGenres(() => data.map(({ name }) => name));
    });
  }, []);

  const maxYear = new Date().getFullYear();

  return (
    <FiltersContainer mt={2} p={2} width="100%">
      <Stack direction={isMobile ? 'column' : 'row'} width="100%">
        <FilterContainer width={isMobile ? '100' : '20'}>

          <Stack direction={isMobile ? 'row' : 'column'} justifyContent={isMobile ? 'space-between' : 'start'}>
            <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Sort By</FilterHeading>
            {isMobile
              ? (
                <DropDown value={`${filters.sortBy}`} onChange={(e) => { onSortByChange(e.target.value)(); }} sx={{ maxWidth: 120 }}>
                  {sortByFilters.map(([filterName, filterTitle]) => (
                    <MenuItem value={filterName} key={filterName}>
                      {filterTitle}
                    </MenuItem>
                  ))}
                </DropDown>
              ) : sortByFilters.map(([filterName, filterTitle, Icon]) => (
                <RowContainer key={filterName}>
                  <SortByFilterContainer
                    selected={filters.sortBy === filterName}
                    onMouseEnter={onSortByHover(filterName)}
                    onMouseLeave={onSortByHoverExit}
                    onClick={onSortByChange(filterName)}
                  >
                    <Icon style={{ height: '100%' }} />

                    <SortByLabel>{filterTitle}</SortByLabel>
                  </SortByFilterContainer>

                  <TriangleShape show={sortByHover === filterName || filters.sortBy === filterName} />
                </RowContainer>
              ))}
          </Stack>

          <RowContainer>
            <FormControlLabel
              style={{ marginLeft: '5px' }}
              control={(
                <FormControlLabel
                  style={{ margin: '10px' }}
                  control={<Switch checked={filters.asc === -1} onChange={onSortModeChange} />}
                  label="Desc"
                />
            )}
              label="Asc"
              labelPlacement="start"
            />
          </RowContainer>
        </FilterContainer>

        <FilterContainer
          width={isMobile ? '100' : '20'}
          direction={isMobile ? 'row' : 'column'}
          alignItems="center"
          justifyContent={isMobile ? 'space-between' : undefined}
        >
          <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Rating</FilterHeading>
          <DropDown value={`${filters.rating}`} onChange={onRatingChange} sx={{ maxWidth: 120 }}>
            {ratingRanges.map(([min, max], index) => (
              <MenuItem key={index} value={index}>
                {`${min}-${max}`}
              </MenuItem>
            ))}
          </DropDown>
        </FilterContainer>

        {/* <FilterContainer
          width={isMobile ? '100' : '25'}
          direction={isMobile ? 'row' : 'column'}
          alignItems="center"
          justifyContent={isMobile ? 'space-between' : undefined}
        >
          <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Popularity</FilterHeading>

          <DropDown value={`${filters.popularity}`} onChange={onPopularityChange} sx={{ maxWidth: 120 }}>
            {popularityRanges.map(([min, max], index) => (
              <MenuItem key={(index + 1) * 1000} value={index}>
                {`${min}-${max}`}
              </MenuItem>
            ))}
          </DropDown>
        </FilterContainer> */}

        <FilterContainer
          width={isMobile ? '100' : '20'}
          direction={isMobile ? 'row' : 'column'}
          alignItems="center"
          justifyContent={isMobile ? 'space-between' : undefined}
        >
          <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Year</FilterHeading>

          <Stack direction={isMobile ? 'row' : 'column'} alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
              {isMobile ? null : <YearLabel>From</YearLabel>}

              <DropDown value={filters.release_date.from} onChange={onYearChange} name="from" sx={{ minWidth: 90, maxWidth: 120 }}>
                {Array.from(Array(maxYear - 1899)).map((value, index) => (
                  <MenuItem key={filters.release_date.to - index} value={maxYear - index}>
                    {maxYear - index}
                  </MenuItem>
                ))}
              </DropDown>
            </Stack>
            {isMobile ? <Typography>—</Typography> : null}
            <Stack direction="row" spacing={isMobile ? 0 : 2} pt={isMobile ? 0 : 1} alignItems="center">
              {isMobile ? null : <YearLabel>To</YearLabel>}

              <div>
                <DropDown value={filters.release_date.to} onChange={onYearChange} name="to" sx={{ minWidth: 90, maxWidth: 120 }}>
                  {Array.from(Array(maxYear - 1899)).map((value, index) => (
                    <MenuItem key={maxYear - index} value={maxYear - index}>
                      {maxYear - index}
                    </MenuItem>
                  ))}
                </DropDown>
              </div>
            </Stack>
          </Stack>

        </FilterContainer>
        {!isMobile ? (
          <Box width="40%" pl={2}>
            <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Genres</FilterHeading>

            <Stack direction="row" flex={1} flexWrap={isMobile ? 'nowrap' : 'wrap'} overflow={isMobile ? 'scroll' : undefined}>
              {allGenres.map((genre) => (
                <CheckBoxContainer
                  key={genre}
                  control={<Checkbox onClick={onGenresChange(genre)} />}
                  title={genre}
                  label={genre}
                />
              ))}

            </Stack>
          </Box>
        ) : null}
      </Stack>

      {isMobile ? (
        <Stack width="100%" direction="row" spacing={2} alignItems="center">
          <FilterHeading variant={isMobile ? 'h5' : 'h4'}>Genres</FilterHeading>
          <Stack direction="row" flex={1} flexWrap={isMobile ? 'nowrap' : 'wrap'} overflow={isMobile ? 'scroll' : undefined}>
            {allGenres.map((genre) => (
              <CheckBoxContainer
                key={genre}
                control={<Checkbox onClick={onGenresChange(genre)} />}
                title={genre}
                label={genre}
              />
            ))}

          </Stack>
        </Stack>
      ) : null}
    </FiltersContainer>
  );
}

SearchFilters.defaultProps = {
  filters: {
    asc: -1,
    rating: 0,
    genres: [],
    popularity: 0,
    sortBy: 'rating',
    release_date: { from: '1900', to: '2100' },
  },
  setFilters: () => {},
};

SearchFilters.propTypes = {
  filters: PropTypes.shape({
    asc: PropTypes.number,
    rating: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    popularity: PropTypes.number,
    sortBy: PropTypes.string,
    release_date: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }),
  }),
  setFilters: PropTypes.func,
};
