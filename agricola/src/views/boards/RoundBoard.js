import React, { useState, useRef  } from 'react';

// MUI 불러오기
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import RoundCard from '../cards/RoundCard'
import WebSocketClient from '../../components/WebSocketClient'; // WebSocketClient 불러오기

export default function RoundBoard({ currentPlayer }) {
  
  // 0: 사람없음, 1~4: 플레이어 -> 6개 카드
  const initialClickedRoundCards = [2, 1, 3, 4, 0, 0];
  const [clickedRoundCards, setClickedRoundCards] = useState(initialClickedRoundCards);
  
  // 자원누적이 필요한 카드: 1,2,4,6,11,12,13 번
  const initialResourceRoundCards = [,2,1,,1,,1,,,,,1,1,1,,];
  const [resourceRoundCards, setResourceRoundCards] = useState(initialResourceRoundCards);

  // 뒷면이면 0, 앞면이면 1
  const initialIsBackRoundCards = [];
  const [isBackRoundCards, setIsBackRoundCards] = useState(initialIsBackRoundCards);

  const sendMessageRef = useRef(null);

  // 카드 클릭시 백엔드에게 메시지 전송
  const handleCardClick = (cardNumber) => {
    setClickedRoundCards((prev) => {
      const newClickedRoundCards = [...prev];
      // newClickedRoundCards[cardNumber - 1] = currentPlayer;
      console.log(`${currentPlayer}번 플레이어가 라운드카드 ${cardNumber}번을 클릭했습니다.`);
      
      // 소켓 메시지 전송
      if (sendMessageRef.current) {
        const messageJSON = JSON.stringify({ currentPlayer, cardNumber });
        sendMessageRef.current(`/app/room/1/playerChoice`, messageJSON );
        console.log('SEND Round CARD')
      }

      return newClickedRoundCards;
    });
  };

  // 보드 정보 백엔드에게 받아오기
  const handleMessageReceived = (message) => {
    console.log('Message received from server:', message);
    if (message.clickedRoundCards) {
      setClickedRoundCards(message.clickedRoundCards);
    }
    if (message.resourceRoundCards) {
      setResourceRoundCards(message.resourceRoundCards);
    }
    if (message.isBackRoundCards) {
      setIsBackRoundCards(message.isBackRoundCards);
    }
  };

  return (
    <Box
      height={420}
      width={650}
      display="flex"
      justifyContent="center"
      gap={4}
      p={2}
      sx={{ m: 0 }}
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
      <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
        {Array.from(Array(4)).map((playerNumber, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <RoundCard 
              cardNumber={index+1} 
              playerNumber={playerNumber} 
              isClicked={() => handleCardClick(index + 1)}
              onClick={() => handleCardClick(index + 1)}
              sendMessage={sendMessageRef.current}
              resource={resourceRoundCards[index+1]}
            />
          </Grid>
        ))}
        {Array.from(Array(1)).map((playerNumber, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  
              cardNumber={index+5} 
              playerNumber={playerNumber} 
              isClicked={() => handleCardClick(index + 5)}
              onClick={() => handleCardClick(index + 5)}
              sendMessage={sendMessageRef.current}
              resource={resourceRoundCards[index+5]}
            />
          </Grid>
        ))}
        {Array.from(Array(1)).map((playerNumber, index) => (
          <Grid item xs={2} sm={2} md={8} key={index}>
            <RoundCard  
              cardNumber={index+6} 
              playerNumber={playerNumber} 
              isClicked={() => handleCardClick(index + 6)}
              onClick={() => handleCardClick(index + 6)}
              sendMessage={sendMessageRef.current}
              resource={resourceRoundCards[index+6]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
