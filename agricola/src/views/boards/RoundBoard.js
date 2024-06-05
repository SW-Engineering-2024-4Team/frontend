import React, { useState } from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import RoundCard from '../cards/RoundCard'

const RoundBoard = () => {
  const initialClickedRoundCards = [0, 1, 0, 4, 0, 0, 3, 0, 2, 0, 1, 1, 0, 0];
  const [clickedRoundCards, setClickedRoundCards] = useState(initialClickedRoundCards);

  const handleCardClick = (cardNumber) => {
    setClickedRoundCards((prev) => {
      const newClickedRoundCards = [...prev];
      newClickedRoundCards[cardNumber - 1] = newClickedRoundCards[cardNumber - 1] === 0 ? 1 : 0;
      return newClickedRoundCards;
    });
  };

  return (
    <Box
      height={420}
      width={650}
      mx={1}
      my={2}
      display="flex"
      justifyContent="center"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey", m: 0 }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <RoundCard 
              cardNumber={index+1} 
              playerNumber={index} 
              index={index} 
            />
          </Grid>
        ))}
        {Array.from(Array(1)).map((_, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  
              cardNumber={index+5} 
              playerNumber={index} 
              index={index} 
            />
          </Grid>
        ))}
        {Array.from(Array(1)).map((_, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  
              cardNumber={index+6} 
              playerNumber={index+1} 
              index={index} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoundBoard;
