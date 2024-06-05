// import React, { useState } from 'react';

// // MUI 불러오기
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';

// // 주요 설비 카드 불러오기
// import MajorCard from '../cards/MajorCard';

// const MajorBoard = () => {
//   // 각 카드의 흑백 상태를 관리할 상태 추가
//   const [grayscaleStates, setGrayscaleStates] = useState(Array(6).fill(false));

//   const handleCardClick = (index) => {
//     // 특정 카드의 흑백 상태를 true로 변경
//     setGrayscaleStates((prevStates) => {
//       const newStates = [...prevStates];
//       newStates[index] = true;
//       return newStates;
//     });
//   };

//   return (
//     <Box
//       height={420}
//       width={480}
//       mx={2}
//       my={2}
//       display="flex"
//       alignItems="center"
//       gap={4}
//       p={2}
//       sx={{ border: '2px solid grey' }}
//     >
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {Array.from(Array(6)).map((_, index) => (
//           <Grid item xs={2} sm={4} md={4} key={index}>
//             <MajorCard 
//               cardNumber={index + 1} 
//               index={index} 
//               isGrayscale={grayscaleStates[index]} 
//               onClick={handleCardClick} 
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default MajorBoard;
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MajorCard from '../cards/MajorCard';

const MajorBoard = ({ handleClick }) => {
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
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <MajorCard 
              cardNumber={index + 1} 
              index={index} 
              onClick={handleClick} 
              isGrayscale={false} // Default value, you can change it based on your logic
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MajorBoard;
