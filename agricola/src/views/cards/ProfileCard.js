import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { blue, green, red, yellow } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import { usePlayer } from '../../components/PlayerContext';

// 선 표시(뱃지)
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundImage: `url("../../image/Profile/playerFirst.png")`, // 뱃지 이미지 경로 설정
    backgroundSize: 'cover',
    width: '30px', // 뱃지 이미지의 가로 크기에 맞게 조정
    height: '30px', // 뱃지 이미지의 세로 크기에 맞게 조정
    '&::after': {
      display: 'none', // 이미지에서 사용하지 않는 요소 숨기기
    },
  },
}));

const ProfileCard = ({ currentPlayer, name, profileImage, profileNum, isFirstPlayer }) => {
  const { setClickedPlayer } = usePlayer();

  // 테두리 색 정하기
  const getColor = () => {
    const colors = [green[500], red[500], blue[500], yellow[500]];
    return colors[profileNum];
  };

  const borderColor = getColor();

  const handleOpenUserMenu = (event) => {
    setClickedPlayer(currentPlayer);
    console.log(currentPlayer);
  };

  return (
    // 테두리 박스 설정 
    <Box
      height={57}
      width={120}
      my={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={4}
      p={2}
    > 
      <Tooltip title={name}> 
        <IconButton onClick={handleOpenUserMenu} sx={{ width: 100, height: 100 }}> 
          {isFirstPlayer ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                alt={name}
                src={profileImage}
                sx={{
                  width: 100,
                  height: 100,
                  border: `6px solid ${borderColor}`,
                }}
              />
            </StyledBadge>
          ) : (
            <Avatar
              alt={name}
              src={profileImage}
              sx={{
                width: 100,
                height: 100,
                border: `6px solid ${borderColor}`,
              }}
            />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ProfileCard;