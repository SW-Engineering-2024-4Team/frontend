import React from 'react';

// MUI 불러오기
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';

const OwnBoard = () => {
   // 다크모드 세팅하기
   const theme = useTheme()
   const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
 
  return (
    <Box
      height={170}
      width={420}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
    </Box>
  );
};

export default OwnBoard;
