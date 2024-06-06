import * as React from "react";

// MUI 불러오기
import Grid from '@mui/material/Grid';

// 보드판 불러오기
import ProfileBoard from '../views/boards/ProfileBoard';
import ActionBoard from '../views/boards/ActionBoard';
import RoundBoard from '../views/boards/RoundBoard';
import CurrentBoard from '../views/boards/CurrentBoard';
import ResourceBoard from '../views/boards/ResourceBoard';
import PersonalBoard from '../views/boards/PersonalBoard2';
import OwnBoard from '../views/boards/OwnBoard';
import TrigerBoard from '../views/boards/TrigerBoard';

// 팝업 버튼 불러오기
import MajorPopUp from '../components/buttons/MajorPopUp';
import SettingPopUp from '../components/buttons/SettingPopUp';
import ChatPopUp from '../components/buttons/ChatPopUp';

// 컨텍스트 관련 불러오기
import { PlayerProvider, usePlayer } from './PlayerContext';

function GamePage(props) {
  const [msg, setMsg] = React.useState(""); // 메시지 입력 상태 관리
  const [oldChat, setOldChat] = React.useState(props.content.length); 
  const exibLastChat = React.useRef(null);

  // PlayerContext 사용
  const { currentPlayer } = usePlayer();

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
    <Grid>
      <Grid container spacing={1}>
        <CurrentBoard />  
        <MajorPopUp />
        <SettingPopUp />
        <ChatPopUp />
      </Grid>

      <Grid container spacing={1}>
        <ProfileBoard />
        <ActionBoard currentPlayer={1} />
        <RoundBoard />
      </Grid>

      <Grid container spacing={1}>
        <ResourceBoard />
        <PersonalBoard currentPlayer={currentPlayer} />
        <Grid item xs>
          <OwnBoard />
          <TrigerBoard />
        </Grid>
      </Grid>
    </Grid>
  );
}

// PlayerProvider로 GamePage를 래핑하여 currentPlayer 값을 제공
export default function App(props) {
  return (
    <PlayerProvider>
      <GamePage {...props} />
    </PlayerProvider>
  );
}
