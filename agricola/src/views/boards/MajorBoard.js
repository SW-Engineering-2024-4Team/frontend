import React from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// 주요 설비 카드 불러오기
import MajorCard from '../cards/MajorCard'

const MajorBoard = () => {
 
  return (
    <Box
      height={420}
      width={480}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MajorCard  number={index+1} index={index} />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MajorBoard;
