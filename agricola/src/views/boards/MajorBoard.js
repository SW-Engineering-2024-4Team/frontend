import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MajorCard from '../cards/MajorCard';
import { useDeckCard1, useDeckCard2, useDeckCard3, useDeckCard4 } from '@/components/CardContext';

const initialMajorCards = [
  { cardNumber: 1, cardType: 'major' },
  { cardNumber: 2, cardType: 'major' },
  { cardNumber: 3, cardType: 'major' },
  { cardNumber: 4, cardType: 'major' },
  { cardNumber: 5, cardType: 'major' },
  { cardNumber: 6, cardType: 'major' },
];

const MajorBoard = ({ currentPlayer, handleClick }) => {
  const [majorCards, setMajorCards] = useState(initialMajorCards);

  const { deckCard1, setDeckCard1 } = useDeckCard1();
  const { deckCard2, setDeckCard2 } = useDeckCard2();
  const { deckCard3, setDeckCard3 } = useDeckCard3();
  const { deckCard4, setDeckCard4 } = useDeckCard4();

  const handleMajorCardClick = ({ cardType, cardNumber }) => {
    setMajorCards((prevList) => prevList.filter((item) => item.cardNumber !== cardNumber));
    
    const clickedCard = majorCards.find((item) => item.cardNumber === cardNumber);
    
    if (clickedCard) {
      setDeckCard1((prevList) => [...prevList, clickedCard]);
    }
  };

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
        {majorCards.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.cardNumber}>
            <MajorCard 
              cardNumber={item.cardNumber}
              onClick={() => handleMajorCardClick(item)} 
              isGrayscale={false} // Default value, you can change it based on your logic
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MajorBoard;
