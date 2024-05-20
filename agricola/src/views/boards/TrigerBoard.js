import React, { useState } from 'react';
import Box from '@mui/material/Box';

import MinorCard from '../cards/MinorCard';
import WorkCard from '../cards/WorkCard';

const TrigerBoard = () => {

  return (
    <Box
      height={170}
      width={400}
      my={2}
      display="flex"
      alignItems="flex-start" 
      justifyContent="flex-start"
      gap={4}
      p={4}
      sx={{ 
        border: '2px solid grey',
        overflowX: 'auto',
        overflowY: 'visible',
        '&::-webkit-scrollbar': { display: 'none', },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
    >
      <Box
        justifyContent="flex-start" 
        sx={{ 
          display: 'flex', 
          width: 'max-content', 
        }}
      >
        {Array.from(Array(3)).map((_, index) => (
          <React.Fragment key={index}>
            <Box sx={{ flex: '0 0 auto', mr: '-30px' }}>
              <MinorCard
                number={index + 1}
                index={index}
                onClick={(index, number) => handleCardClick(index, number)}
              />
            </Box>
            <Box sx={{ flex: '0 0 auto', mr: '-30px' }}>
              <WorkCard
                number={index + 1}
                index={index}
                onClick={(index, number) => handleCardClick(index, number)}
              />
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default TrigerBoard;
