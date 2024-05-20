import React, { useState} from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import RoundCard from '../cards/RoundCard'

const RoundBoard = () => {

  return (
    <Box
      height={420}
      width={650}
      mx={2}
      my={2}
      display="flex"
      justifyContent="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <RoundCard number={index+1} playerNumber={index} index={index} />
          </Grid>
        ))}
        {Array.from(Array(1)).map((_, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  number={index+5} playerNumber={index} index={index} />
          </Grid>
        ))}
        {Array.from(Array(1)).map((_, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  number={index+6} playerNumber={index+1} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoundBoard;
