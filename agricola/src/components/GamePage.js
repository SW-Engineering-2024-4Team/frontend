import * as React from "react"

// MUI 불러오기
import Grid from '@mui/material/Grid'

// 보드판 불러오기
import ProfileBoard from '../views/boards/ProfileBoard'
import ActionBoard from '../views/boards/ActionBoard'
import RoundBoard from '../views/boards/RoundBoard'
import CurrentBoard from '../views/boards/CurrentBoard'
import ResourceBoard from '../views/boards/ResourceBoard'
import PersonalBoard from '../views/boards/PersonalBoard'
import CardDeckBoard from '../views/boards/CardDeckBoard'

// 팝업 버튼 불러오기
import MajorPopUp from '../components/buttons/MajorPopUp'
import SettingPopUp from '../components/buttons/SettingPopUp'
import ChatPopUp from '../components/buttons/ChatPopUp'
import UseCardPopUp from './buttons/UseCardPopUp'

export default function GamePage(props) {
  const [msg, setMsg] = React.useState(""); // 메시지 입력 상태 관리
  const [oldChat, setOldChat] = React.useState(props.content.length); 
  const exibLastChat = React.useRef(null);

  const handleEnter = (e) => { // 클릭 이벤트 발생시
    sendMsg();
  };

  const sendMsg = () => { 
    if (msg !== "") {
      props.btnFunction(props.name, msg);
      setMsg("");
    }
  };

  const displayMsg = (e_, idx_) => {
    switch (e_.name) {
      case "newPlayer":
        return (
          <ReceivedMessage key={idx_}>
            <Typography>{e_.msg}</Typography>
          </ReceivedMessage>
        );
      case "cartela":
        return (
          <ReceivedMessage key={idx_}>
            <Typography>seus numeros são:</Typography>
            <Typography>{e_.msg.toString()}</Typography>
            <Typography>boa sorte!</Typography>
          </ReceivedMessage>
        );
      case "sent-200":
        return (
          <SentMessage key={idx_}>
            <Typography>{e_.msg}</Typography>
          </SentMessage>
        );
      default:
        return (
          <ReceivedMessage key={idx_}>
            <Typography variant="subtitle2">{e_.name}</Typography>
            <Typography>{e_.msg}</Typography>
          </ReceivedMessage>
        );
    }
  };

  React.useEffect(() => {
    if (props.content.length !== oldChat) {
      setOldChat(props.content.length);
      exibLastChat.current.scrollTop = exibLastChat.current.scrollHeight;
    }
  }, [props.content, oldChat]);

  return (
    <div style={{
      position: 'absolute',
      backgroundImage: 'url("../image/background.png")', // 배경 이미지 경로에 따라 수정
      backgroundSize: '2000px', // 배경 이미지 크기 조절
      backgroundRepeat: 'repeat', // 배경 이미지 반복 설정
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      minHeight: '1500px', // 최소 높이 설정
    }}>
      <Grid >
        <Grid container spacing = {1}>
          <CurrentBoard />  
          <MajorPopUp />
          <SettingPopUp />
          <ChatPopUp />
          <UseCardPopUp />
        </Grid>

        <Grid container spacing = {1}>
          <ProfileBoard />
          <ActionBoard />
          <RoundBoard />
        </Grid>

        <Grid container spacing = {1}>
          <ResourceBoard />
          <PersonalBoard />
          <Grid item xs >
            <CardDeckBoard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};