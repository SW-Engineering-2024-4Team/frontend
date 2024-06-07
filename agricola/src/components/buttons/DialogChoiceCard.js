import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import ChoiceCard from '../../views/cards/ChoiceCard';

function DialogChoiceCard(props) {
  const { cardType, cardNumber, onClose, open, sendMessage } = props;

  const [cardName, setCardName] = useState('');
  const [count, setCount] = useState([]);

  useEffect(() => {
    if (cardType === 'action' && cardNumber === 7) {
      setCardName('농장 확장');
      setCount([1, 2, 3]);
    } else if (cardType === 'action' && cardNumber === 8) {
      setCardName('회합 장소');
      setCount([1, 2, 3]);
    } else if (cardType === 'round' && cardNumber === 1) {
      setCardName('곡식 활용');
      setCount([1, 2, 3]);
    } else if (cardType === 'round' && cardNumber === 4) {
      setCardName('주요 설비');
      setCount([1, 2]);
    } else if (cardType === 'round' && cardNumber === 5) {
      setCardName('기본 가족 늘리기');
      setCount([1, 2]);
    } else if (cardType === 'round' && cardNumber === 6) {
      setCardName('농장 개조');
      setCount([1, 2]);
    }
  }, [cardType, cardNumber]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{cardName}</DialogTitle>
      <Box
        mx={2}
        my={2}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        {count.map((index) => (
          <ChoiceCard
            key={index}
            cardType={cardType}
            cardNumber={cardNumber}
            index={index}
            sendMessage={sendMessage}
          />
        ))}
      </Box>
    </Dialog>
  );
}

DialogChoiceCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  cardNumber: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default DialogChoiceCard;
