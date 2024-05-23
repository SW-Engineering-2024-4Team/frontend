import React, { useState } from 'react'

// MUI 불러오기
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// 행동 카드 불러오기
import ActionCard from '../cards/ActionCard'

export default function ActionBoard({ currentPlayer }) {
  const initialClickedActionCards = [0, 1, 0, 4, 0, 0, 3, 0, 2, 0, 1, 1, 0, 0];
  const [clickedActionCards, setClickedActionCards] = useState(initialClickedActionCards);

  const handleCardClick = (cardNumber) => {
    setClickedActionCards((prev) => {
      const newClickedActionCards = [...prev];
      newClickedActionCards[cardNumber - 1] = currentPlayer;
      console.log(`${currentPlayer}번 플레이어가 행동카드 ${cardNumber}번을 클릭했습니다.`);
      return newClickedActionCards;
    });
  };

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
        {clickedActionCards.map((playerNumber, index) => (
          <Grid item xs={3} sm={1} md={1} key={index}>
            <ActionCard
              cardNumber={index + 1}
              playerNumber={playerNumber}
              onClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
