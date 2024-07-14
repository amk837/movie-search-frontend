import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { number } from 'prop-types';
import PlayCircle from '@mui/icons-material/PlayCircle';
import { getMovieVideos } from '../../services/movieService';
import { MEDIA_QUERIES } from '../../constants';

function MovieVideos({ movieId }) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.isMobile);
  const [data, setData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movieData = selectedMovie || data?.[0];

  useEffect(() => {
    const priority = {
      'official trailer': 0,
      'teaser trailer': 1,
      'final trailer': 2,
    };
    getMovieVideos(movieId).then((videoData) => {
      setData(videoData?.results?.sort(({ name: n1, type: t1 }, { name: n2, type: t2 }) => {
        const isTrailer1 = t1 === 'Trailer';
        const isTrailer2 = t2 === 'Trailer';

        if (isTrailer1 && !isTrailer2) return -1;
        if (!isTrailer1 && isTrailer2) return 1;
        if (isTrailer1 && isTrailer2) return priority[n1.toLowerCase()] - priority[n2.toLowerCase()];
        return 0;
      }) || null);
    });
  }, []);

  if (!data) return null;

  return (
    <Box py={2}>
      <Typography variant="h6" pb={1}>Videos</Typography>

      <Stack direction={isMobile ? 'column' : 'row'} width="100%" spacing={2}>
        {movieData ? (
          <Box flex={1} width={isMobile ? '100vw' : undefined} height={isMobile ? '50vh' : '60vh'} alignSelf="center">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movieData.key}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Box>
        ) : null}

        <Box position="relative">
          <Stack
            width={isMobile ? '100%' : 340}
            direction={isMobile ? 'row' : 'column'}
            height={isMobile ? undefined : '60vh'}
            overflow="auto"
            spacing={2}
            position="relative"
          >
            {data.map(({ key, title, ...rest }) => (
              <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => { setSelectedMovie({ ...rest, key, title }); }}
                sx={{ cursor: 'pointer' }}
              >
                <img src={`https://i.ytimg.com/vi/${key}/${isMobile ? '' : 'mq'}default.jpg`} alt={title} />
                {movieData?.key === key ? (
                  <Box position="absolute">
                    <PlayCircle sx={{ width: isMobile ? 40 : 80, height: isMobile ? 40 : 80, color: 'black', backgroundColor: 'white', borderRadius: 10 }} />
                  </Box>
                ) : null}
              </Box>
            ))}

          </Stack>
          {isMobile && data?.length > 3 ? (
            <Box
              height="100%"
              position="absolute"
              zIndex={100}
              width={60}
              sx={{ background: 'linear-gradient(to right, #0000, #000 100%)' }}
              bottom={0}
              right={0}
            />
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
}

export default MovieVideos;

MovieVideos.propTypes = { movieId: number };
MovieVideos.defaultProps = { movieId: 0 };
