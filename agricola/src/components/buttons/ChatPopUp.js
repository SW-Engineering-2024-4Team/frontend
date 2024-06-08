import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

// MUI 불러오기
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Dialog from '@mui/material/Dialog'
import ChatPage from '@/components/ChatPage'

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <ChatPage />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ChatPopUp() {
  const router = useRouter();
  const { room, name } = router.query;
  const [name2, setName2] = React.useState(name);
  const [path, setPath] = React.useState(" ");
  
  const [chat, setChat] = React.useState([]); // 채팅 내용
  const [open, setOpen] = React.useState(false); // 팝업 오픈

  React.useEffect(() => {
    socketInitializer(name);
  }, [name]);

  //set event listeners
  const socketInitializer = async (name_) => {
    try {
      console.log("here 1");
      await fetch("/api/socket?option=connection");
      socket = io();
      socket.on("connect", () => {
        if (name_ != undefined) joinRoom(room, name);
      });
      
      socket.on("get-chat", (msg) => {
        setChat((prev) => [...prev, msg]);
      });

    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const imagePath = '../../image/CardFrame/frame6.png'

  return (
    <div>
      <Card sx={{ width: 75, height: 75, my: 2, mx: 0.5 }} >
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            image={imagePath}
            onClick={handleClickOpen}
          />
        </CardActionArea>
      </Card>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
