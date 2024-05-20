import React, { useState, useEffect } from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const CurrentBoard = () => {
  const count = 2;
  return (
    <Box
      height={50}
      width={1200}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <h1> 🕶️ 현재 라운드: {count} / 14</h1>
      <Alert severity="success">This is a success Alert.</Alert>  
    </Box>
  );
};

export default CurrentBoard;
