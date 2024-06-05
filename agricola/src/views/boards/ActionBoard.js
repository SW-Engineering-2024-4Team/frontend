import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ActionCard from '../cards/ActionCard';
import WebSocketClient from '../../components/WebSocketClient'; // WebSocketClient 불러오기

export default function ActionBoard({ currentPlayer }) {

  // 0: 사람없음, 1~4: 플레이어 -> 14개 카드
  const initialClickedActionCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [clickedActionCards, setClickedActionCards] = useState(initialClickedActionCards);
  
  // 자원누적이 필요한 카드: 1,2,4,6,11,12,13 번
  const initialResourceActionCards = [,2,1,,1,,1,,,,,1,1,1,,];
  const [resourceActionCards, setResourceActionCards] = useState(initialResourceActionCards);

  const sendMessageRef = useRef(null);

  // 카드 클릭시 백엔드에게 메시지 전송
  const handleCardClick = (cardNumber) => {
    setClickedActionCards((prev) => {
      const newClickedActionCards = [...prev];
      newClickedActionCards[cardNumber - 1] = currentPlayer;
      console.log(`${currentPlayer}번 플레이어가 행동카드 ${cardNumber}번을 클릭했습니다.`);
      
      // 소켓 메시지 전송
      if (sendMessageRef.current) {
        const messageJSON = JSON.stringify({ currentPlayer, cardNumber });
        sendMessageRef.current(`/app/room/1/actionCardClick`, messageJSON );
        console.log('SEND ACTION CARD')
      }

      return newClickedActionCards;
    });
  };

  // 보드 정보 백엔드에게 받아오기
  const handleMessageReceived = (message) => {
    console.log('Message received from server:', message);
    if (message.clickedActionCards) {
      setClickedActionCards(message.clickedActionCards);
    }
    if (message.resourceActionCards) {
      setResourceActionCards(message.resourceActionCards);
    }
  };

  return (
    <Box
      height={420}
      width={700}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey", m: 0 }}
    >
      <WebSocketClient
        roomId="1"
        playerId={currentPlayer}
        onMessageReceived={handleMessageReceived}
        ref={(client) => {
          if (client) {
            sendMessageRef.current = client.sendMessage;
          }
        }}
      />
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={5}>
        {clickedActionCards.map((playerNumber, index) => (
          <Grid item xs={3} sm={1} md={1} key={index}>
            <ActionCard
              cardNumber={index + 1}
              playerNumber={playerNumber}
              onClick={() => handleCardClick(index + 1)}
              sendMessage={sendMessageRef.current}
              resource={resourceActionCards[index+1]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
