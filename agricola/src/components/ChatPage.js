import * as React from "react"

// MUI 불러오기
import Box from '@mui/material/Box' 
import IconButton from'@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from'@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { MdOutlineSend } from "react-icons/md";
import { styled } from "@mui/system";

const MessageContainer = styled(Box)({
  overflowY: "auto",
  maxHeight: "400px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
});

const Message = styled(Paper)(({ theme }) => ({
  padding: "8px 16px",
  margin: "8px 0",
  maxWidth: "80%",
  wordBreak: "break-word",
  alignSelf: "flex-start",
}));

const SentMessage = styled(Message)({
  alignSelf: "flex-end",
  backgroundColor: "#e0f7fa",
});

const ReceivedMessage = styled(Message)({
  alignSelf: "flex-start",
  backgroundColor: "#f1f1f1",
});

export default function ChatDisplay({ content = [], cartela, btnFunction, name }) {
  const [msg, setMsg] = React.useState("");
  const [oldChat, setOldChat] = React.useState(content.length);
  const exibLastChat = React.useRef(null);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };

  const sendMsg = () => {
    const trimmedMsg = msg.trim();
    if (trimmedMsg) {
      btnFunction(name, trimmedMsg);
      setMsg("");
    }
  };

  const displayMsg = (e_, idx_) => {
    const key = e_.id || idx_;
    switch (e_.name) {
      case "newPlayer":
        return (
          <ReceivedMessage key={key}>
            <Typography>{e_.msg}</Typography>
          </ReceivedMessage>
        );
      case "cartela":
        return (
          <ReceivedMessage key={key}>
            <Typography>내 순서:</Typography>
            <Typography>{e_.msg.toString()}</Typography>
            <Typography>행운을 빕니다!</Typography>
          </ReceivedMessage>
        );
      case "sent-200":
        return (
          <SentMessage key={key}>
            <Typography>{e_.msg}</Typography>
          </SentMessage>
        );
      default:
        return (
          <ReceivedMessage key={key}>
            <Typography variant="subtitle2">{e_.name}</Typography>
            <Typography>{e_.msg}</Typography>
          </ReceivedMessage>
        );
    }
  };

  React.useEffect(() => {
    if (content.length !== oldChat) {
      setOldChat(content.length);
      exibLastChat.current.scrollTop = exibLastChat.current.scrollHeight;
    }
  }, [content, oldChat]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <MessageContainer ref={exibLastChat}>
        {cartela && displayMsg({ name: "cartela", msg: cartela }, 0)}
        {content.map((e, idx) => displayMsg(e, idx + 1))}
      </MessageContainer>
      <Box display="flex" padding="8px" alignItems="center">
        <InputBase
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="메시지를 입력하세요.."
          fullWidth
        />
        <IconButton onClick={sendMsg}>
          <MdOutlineSend />
        </IconButton>
      </Box>
    </Box>
  );
}
