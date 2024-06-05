
import React, { useState } from 'react';
import Box from '@mui/material/Box';

import MinorCard from '../cards/MinorCard';
import WorkCard from '../cards/WorkCard';
import MajorCard from '../cards/MajorCard';

const TriggerBoard = ({ triggerList, ownList, handleClick }) => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      p={4}
      sx={{
        border: '2px solid grey',
        overflowX: 'auto',
        overflowY: 'visible',
        '&::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
      }}
      height={170}
      width={420}
    >
      {triggerList.map((card) => {
        const CardComponent = card.type === 'minor' ? MinorCard : card.type === 'work' ? WorkCard : MajorCard;
        return (
          <Box key={card.id} sx={{ flex: '0 0 auto', mr: '-30px' }}>
            <CardComponent
              cardNumber={card.id}
              playerNumber={card.playerNumber}
              index={card.index} 
              content={card.content}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default TriggerBoard;
