import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TriggerCard from '../cards/TriggerCard';
import WebSocketClient from '../../components/WebSocketClient';
import { useDeckCard1, useDeckCard2, useDeckCard3, useDeckCard4 } from '@/components/CardContext';

const TriggerBoard = ({ currentPlayer, clickedPlayer }) => {
  const { deckCard1 } = useDeckCard1();
  const { deckCard2 } = useDeckCard2();
  const { deckCard3 } = useDeckCard3();
  const { deckCard4 } = useDeckCard4();

  const [deckCard, setDeckCard] = useState([]);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (clickedPlayer === 1) {
      setColor('rgba(0, 255, 0, 0.3)');
      setDeckCard(deckCard1);
    } else if (clickedPlayer === 2) {
      setColor('rgba(255, 0, 0, 0.3)');
      setDeckCard(deckCard2);
    } else if (clickedPlayer === 3) {
      setColor('rgba(0, 0, 255, 0.3)');
      setDeckCard(deckCard3);
    } else {
      setColor('rgba(255, 255, 0, 0.3)');
      setDeckCard(deckCard4);
    }
  }, [clickedPlayer, deckCard1, deckCard2, deckCard3, deckCard4]);

  const sendMessageRef = useRef(null);

  const handleCardClick = ({ cardType, cardNumber }) => {
    console.log(`${currentPlayer}번 플레이어가 ${cardType}카드 ${cardNumber}번을 클릭했습니다.`);

    if (sendMessageRef.current) {
      const messageJSON = JSON.stringify({ currentPlayer, cardType, cardNumber });
      sendMessageRef.current(`/app/room/1/triggerCardClick`, messageJSON);
      console.log('SEND TRIGGER CARD');
    }
  };

  return (
    <Box
      height={200}
      width={650}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor={color}
      gap={4}
      p={2}
      sx={{
        m: 0,
        borderRadius: 2,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <WebSocketClient
        roomId="1"
        playerId={currentPlayer}
        ref={(client) => {
          if (client) {
            sendMessageRef.current = client.sendMessage;
          }
        }}
      />

      {deckCard.map((item) => (
        <Box
          key={item.cardNumber}
          sx={{ flex: '0 0 auto', my: '90px' }}
          style={{ cursor: 'pointer' }}
        >
          <TriggerCard
            cardType={item.cardType}
            cardNumber={item.cardNumber}
            onClick={() => handleCardClick(item)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TriggerBoard;
