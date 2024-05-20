import React from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';

const ResourceBoard = () => {

  return (
    <Box
      height={400}
      width={150}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
    </Box>
  );
};

export default ResourceBoard;
