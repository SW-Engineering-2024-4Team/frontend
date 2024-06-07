import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

function ChoiceCard({ cardType, cardNumber, index, sendMessage }) {
  const handleClick = () => {
    if (typeof sendMessage === 'function') {
      sendMessage(`ChoiceCard: cardType ${cardType}, cardNumber ${cardNumber}, index ${index}`);
    }
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          image={`../../image/ChoiceCard/${cardType}${cardNumber}-${index}.png`}
          alt={`ChoiceCard ${cardNumber}`}
        />
      </CardActionArea>
    </Card>
  );
}

ChoiceCard.propTypes = {
  cardNumber: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default ChoiceCard;
