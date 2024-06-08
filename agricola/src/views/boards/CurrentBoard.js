import React, { useState, useEffect } from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';

const CurrentBoard = ({currentPlayer}) => {
  const count = 2;
  return (
    <Box
      height={38}
      width={1300}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#87C748"
      gap={4}
      p={2}
      sx={{ my: 2, mx: 0.5, border: '3.3px solid #7B5B3C', borderRadius: 1.5 }}
    >
      <h2 style={{ color: '#FFFFFF' }}> 현재 라운드: {count} / 14</h2>
      <h3> 당신은 {currentPlayer} 번 플레이어 입니다. </h3>
      {/* <Alert severity="success">This is a success Alert.</Alert>   */}
    </Box>
  );
};

export default CurrentBoard;
