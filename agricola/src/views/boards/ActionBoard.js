import React from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ActionCard from '../cards/ActionCard';

const ActionBoard = () => {
 
  return (
    <Box
      height={420}
      width={700}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={5}>
        {Array.from(Array(14)).map((_, index) => (
          <Grid item xs={3} sm={1} md={1} key={index}>
            <ActionCard  number={index+1} playerNumber={index%4} index={index} />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionBoard;
