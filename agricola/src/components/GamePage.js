import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

// 보드판 불러오기
import ProfileBoard from '../views/boards/ProfileBoard';
import ActionBoard from '../views/boards/ActionBoard';
import RoundBoard from '../views/boards/RoundBoard';
import CurrentBoard from '../views/boards/CurrentBoard';
import ResourceBoard from '../views/boards/ResourceBoard';
import PersonalBoard from '../views/boards/PersonalBoard2';
import OwnBoard from '../views/boards/OwnBoard';
import TriggerBoard from '../views/boards/TriggerBoard';

// 팝업 버튼 불러오기
import MajorPopUp from '../components/buttons/MajorPopUp';
import SettingPopUp from '../components/buttons/SettingPopUp';
import ChatPopUp from '../components/buttons/ChatPopUp';

// 팝업 다이어로그 불러오기
import DialogChoiceCard from './buttons/DialogChoiceCard';
import WebSocketClient from './WebSocketClient'; // WebSocketClient 불러오기
import WebSocketPage from './WebSocketPage';

// 컨텍스트 관련 불러오기
import { usePlayer } from './PlayerContext';

function GamePage({ currentPlayer }) {
  const { clickedPlayer } = usePlayer();
  
  const [color, setColor] = useState('');

  useEffect(() => {
    console.log('Clicked player:', clickedPlayer);
    if (clickedPlayer == 1) {
      setColor('#BEDE9ECC');
    } else if (clickedPlayer == 2) {
      setColor('#DE9E9ECC');
    } else if (clickedPlayer == 3) {
      setColor('#8D85EECC');
    } else if (clickedPlayer == 4) {
      setColor('#DCDE9ECC');
    }
  }, [clickedPlayer]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // playerChoice 관련해서 백엔드에게 받는 내용
  const [choiceType, setChoiceType] = useState('');
  const [cardNumber, setCardNumber] = useState(8); // 눌렀던 카드 번호
  const [options, setOptions] = useState([]); // "options":["option1":"방 만들기 및 외양간 짓기","option2":"방 만들기만","option3":"외양간 짓기만"]
  const [playerId, setPlayerId] = useState(0); // 팝업을 띄어주는 플레이어 "playerId":"3"

  // 보드 정보 백엔드에게 받아오기
  const handleMessageReceived = (message) => {
    console.log('Message received from server:', message);
    if (message.choiceType) {
      setChoiceType(message.choiceType);
    }
    if (message.cardNumber) {
      setCardNumber(message.cardNumber);
    }
    if (message.options) {
      setOptions(message.options);
    }
    if (message.playerId) {
      setPlayerId(parseInt(message.playerId, 10));
    }
  };

  return (
    <div style={{
      position: 'absolute',
      backgroundImage: 'url("../image/background.png")', // 배경 이미지 경로에 따라 수정
      backgroundSize: '2000px', // 배경 이미지 크기 조절
      backgroundRepeat: 'repeat', // 배경 이미지 반복 설정
      justifyContent: "center",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      minHeight: '1500px', // 최소 높이 설정
    }}>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
        <Grid container spacing={-4}>
          <CurrentBoard currentPlayer={currentPlayer} />
          <MajorPopUp currentPlayer={currentPlayer} />
          <SettingPopUp />
          <ChatPopUp currentPlayer={currentPlayer} />
        </Grid>

        <Grid container spacing={1} >
          <ProfileBoard clickedPlayer={clickedPlayer} />
          <ActionBoard currentPlayer={currentPlayer} />
          <RoundBoard currentPlayer={currentPlayer} />
        </Grid>

        <Grid container spacing={1} >
          <ResourceBoard clickedPlayer={clickedPlayer} />
          <PersonalBoard currentPlayer={currentPlayer} clickedPlayer={clickedPlayer} />
          <Grid> 
            <TriggerBoard currentPlayer={currentPlayer} clickedPlayer={clickedPlayer} />
            <OwnBoard currentPlayer={currentPlayer} />
          </Grid>
        </Grid>
        <WebSocketClient
          roomId="1"
          playerId={currentPlayer}
          onMessageReceived={handleMessageReceived}
        />
        {playerId === currentPlayer ? handleClick() : null}
        <button onClick={handleClick} >
        ChoiceCard TEST
        <DialogChoiceCard
            cardNumber={7}
            choiceType={"AndOr"}
            options={options}
            open={open}
            onClose={handleClose}
            currentPlayer={currentPlayer}
        />
        </button>
        <WebSocketPage 
          roomId="1" 
          message="아 진짜 아그리콜라 귀낯ㅎ"
        />
      </Grid>
    </div>
  );
}

export default GamePage;
