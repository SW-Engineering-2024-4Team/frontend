import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography'; // Typography import 추가
import Tooltip from '@mui/material/Tooltip';

import { actionCardDetails } from '../../components/details/ActionCardDetails';

export default function ActionCard({ cardNumber, resource, playerNumber, onClick, sendMessage }) {
  const [isClicked, setIsClicked] = useState(playerNumber !== 0);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (typeof onClick === 'function') {
      onClick(cardNumber);
    }
    if (typeof sendMessage === 'function') {
      sendMessage(cardNumber);
    }
  };

  const handleCardHover = (event) => {
    const card = event.currentTarget;
    card.style.transform = 'scale(1.1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = '1px 4px 15px -3px rgba(0, 0, 0, 0.5)';
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.transition = 'transform 0.1s linear';
    card.style.boxShadow = 'none';
  };

  const cardClass = `action ${cardNumber} ${isClicked ? 'Y' : 'N'} `;
  const imagePath = `../../image/ActionCard/action${cardNumber}.png`;
  const coverImagePath = playerNumber ? `../../image/ClickedCard/clicked-action${playerNumber}.png` : null;

  return (
    <div>
      <Tooltip title={actionCardDetails[cardNumber - 1]}>
        <Card 
          sx={{ maxWidth: 130 }} 
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <CardActionArea onClick={handleClick}>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={imagePath} // 기본 이미지만 표시
                alt={cardClass}
              />
              {isClicked && coverImagePath && (
                <img
                  src={coverImagePath}
                  alt="coverImage"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <Typography 
                variant="h4" 
                color="text.primary" 
                style={{ position: 'absolute', bottom: 18, right: 75, fontWeight: 'bold' }}
              >
                {resource}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Tooltip>
    </div>
  );
}
