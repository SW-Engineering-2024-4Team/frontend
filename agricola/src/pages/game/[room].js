import { useRouter } from "next/router"
import * as React from "react"
import io from "socket.io-client"

// 페이지 불러오기
import GamePage from "../../components/GamePage"
import LoginPage from "../../components/LoginPage"

let socket;

export default function Room() {
  const router = useRouter();
  const { room, name } = router.query; // URL 쿼리에서 room과 name 가져오기

  // 메시지 헤드
  const [name2, setName2] = React.useState(name); // 이름: 플레이어 이름
  const [path, setPath] = React.useState(" "); // 현재 경로 (방 이름, 플레이어 이름 포함)

  // 메시지 바디
  const [board, setBoard] = React.useState(" "); // 보드: 클릭한 보드가 어떤 보드인지
  const [card, setCard] = React.useState(" "); // 카드: 클릭한 카드가 어떤 카드인지
  const [content, setContent] = React.useState([]); // 콘텐츠: 추가적인 내용 (플래그)

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

      // 보드 정보를 받아 옵니다.
      socket.on("get-board", (msg) => {
        setBoard((prev) => [...prev, msg]);
      });

      // 카드 정보를 받아옵니다.
      socket.on("get-card", (msg) => {
        setCard((prev) => [...prev, msg]); 
      });

      // 콘텐츠 정보를 받아옵니다.
      socket.on("get-content", (msg) => {
        setContent((prev) => [...prev, msg]); 
      });

    } catch (e) {
      console.log("error: ", e);
    }
  };
  
  // 방에 참여하는 함수
  const joinRoom = (room_, name_) => {
    socket.emit("join-room", room_);
    setName2(name_);
    setPath("wait");
  };

  const handleBoard = (name_, msg_) => {
    socket.emit("send-board", { room: room, name: name_, msg: msg_ });
    setBoard((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };
  
  const handleCard = (name_, msg_) => {
    socket.emit("send-card", { room: room, name: name_, msg: msg_ });
    setCard((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  const handleContent = (name_, msg_) => {
    socket.emit("send-content", { room: room, name: name_, msg: msg_ });
    setContent((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  // 게임 화면을 렌더링하는 함수
  const displayGame = (option) => {
    console.log(option);
    return (
      <GamePage 
        name={name2}
        board={board}
        card={card}
        content={content}
        btnBoardFunction={handleBoard}
        btnCardFunction={handleCard}
        btnContentFunction={handleContent}
        onGame={option == "on-game" ? true : false}
      />
    );
  };

  switch (path) {
    case "wait":
      return displayGame();
    case "bingo":
      return (
        <>
          {displayChat("on-game")}
        </>
      );
    default:
      return (
        <>
            <p>
              내 이름: {name} 방 이름: {room}
            </p>
            {name == undefined && (
              <LoginPage type="room" btnFunction={joinRoom} room={room} />
            )}
        </>
      );
  }
}
