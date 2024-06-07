import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { actionCardDetails } from '../../components/details/ActionCardDetails';

export default function ActionCard({ cardNumber, resource, playerNumber, sendMessage, isClicked }) {
  const handleClick = () => {
    if (typeof sendMessage === 'function') {
      sendMessage(cardNumber);
      console.log(cardNumber);
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

  const cardClass = `action ${cardNumber} ${isClicked ? 'Y' : 'N'}`;
  const imagePath = `../../image/ActionCard/action${cardNumber}.png`;
  const coverImagePath = playerNumber ? `../../image/ClickedCard/clicked-action${playerNumber}.png` : null;

  return (
    <div>
      <Tooltip title={actionCardDetails[cardNumber - 1]}>
        <Card
          sx={{ maxWidth: 130, borderRadius: '8px' }}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <CardActionArea onClick={handleClick}>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={imagePath}
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