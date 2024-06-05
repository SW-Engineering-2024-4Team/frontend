import React, { useState } from 'react';

// MUI 컴포넌트
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { minorCardDetails } from '../../components/details/MinorCardDeatails';

const MinorCard = ({ index, cardNumber, isTrigger, onClick }) => {
  
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCardHover = (event) => {
    const card = event.target.closest('.minor-card');
    card.style.transform = 'translateY(-10%) scale(1.1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = '1px 4px 15px -3px rgba(0, 0, 0, 0.5)';
    card.style.zIndex = '1';
    
  };

  const handleCardLeave = (event) => {
    const card = event.target.closest('.minor-card');
    card.style.transform = 'none';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = 'none';
    card.style.zIndex = '0';
  };

  const cardClass = `minor ${cardNumber} ${isClicked ? 'Y' : 'N'}`;
  const imagePath = isClicked ? null : `../image/MinorCard/minor${cardNumber}.png`;

  return (
    <Tooltip title={minorCardDetails[cardNumber-1]}>
      <Card
        className="minor-card"
        sx={{
          maxWidth: 130,
        }}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imagePath}
            alt={cardClass}
          />
          <img
            src={imagePath}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </CardActionArea>
      </Card>
    </Tooltip>
  );
};

export default MinorCard;
