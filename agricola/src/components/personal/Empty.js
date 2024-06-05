import React from 'react';
import Box from '@mui/material/Box';

export default function Empty() {
  return (
    <Box
      sx={{
        width: '4px', // ratio를 width로 설정
        height:'4px', // ratio를 height로 설정
        m : 0
      }}
    >
    </Box>
  );
}