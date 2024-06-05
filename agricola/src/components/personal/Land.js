import React from 'react';
import Box from '@mui/material/Box';

export default function Fence({ ratio, state, pid, isActive, data }) {
  // 세로일 때는 width와 height를 바꿔줌

  return (
    <Box
      sx={{
        width: '100px', // ratio를 width로 설정
        height: '100px', // ratio를 height로 설정
        backgroundColor: pid % 2 ? 'red' : 'blue', // pid에 따라 배경색 변경
        borderRadius: '4px', // border radius 설정
        borderWidth: '1px', // border width 설정
        borderStyle: 'solid', // border style 설정
        borderColor: 'black', // border color 설정
        opacity: isActive ? 1 : 0.1, // isActive 값에 따라 투명도 설정
        m : 0
      }}
    >
    </Box>
  );
}
