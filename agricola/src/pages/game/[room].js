import { useRouter } from "next/router";
import * as React from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import GamePage from "../../components/GamePage";
import LoginPage from "../../components/LoginPage";

let stompClient = null;

export default function Room() {
  const router = useRouter();
  const { room, name } = router.query;

  const [name2, setName2] = React.useState(name);
  const [path, setPath] = React.useState("loading");
  const [board, setBoard] = React.useState([]);
  const [card, setCard] = React.useState([]);
  const [content, setContent] = React.useState([]);

  React.useEffect(() => {
    if (name && room) {
      connect();
    }
  }, [name, room]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8090/gs-guide-websocket");
    stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("Connected to server");

        stompClient.subscribe("/topic/game", (message) => {
          handleGameState(JSON.parse(message.body));
        });

        joinRoom(room, name);
        startGame(room);
      },
      (error) => {
        console.error("Connection error: ", error);
      }
    );
  };

  const joinRoom = (room_, name_) => {
    stompClient.send(
      "/app/join-room",
      {},
      JSON.stringify({ room: room_, name: name_ })
    );
    setName2(name_);
  };

  const startGame = (room_) => {
    const payload = {
      roomNumber: room_,
      players: [
        { id: "1", name: "Player 1" },
        { id: "2", name: "Player 2" },
        { id: "3", name: "Player 3" },
        { id: "4", name: "Player 4" },
      ],
    };
    console.log("Sending startGame message with payload:", payload);
    stompClient.send("/app/startGame", {}, JSON.stringify(payload));
  };

  const handleGameState = (gameState) => {
    console.log("Received game state:", gameState);
    // 게임 상태 처리 로직 추가
    setPath("on-game");
  };

  const handleBoard = (name_, msg_) => {
    stompClient.send(
      "/app/send-board",
      {},
      JSON.stringify({ room: room, name: name_, msg: msg_ })
    );
    setBoard((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  const handleCard = (name_, msg_) => {
    stompClient.send(
      "/app/send-card",
      {},
      JSON.stringify({ room: room, name: name_, msg: msg_ })
    );
    setCard((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  const handleContent = (name_, msg_) => {
    stompClient.send(
      "/app/send-content",
      {},
      JSON.stringify({ room: room, name: name_, msg: msg_ })
    );
    setContent((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  const displayGame = (option) => {
    return (
      <GamePage
        name={name2}
        board={board}
        card={card}
        content={content}
        btnBoardFunction={handleBoard}
        btnCardFunction={handleCard}
        btnContentFunction={handleContent}
        onGame={option === "on-game"}
      />
    );
  };

  if (path === "on-game") {
    return displayGame("on-game");
  } else {
    return <div>Loading...</div>;
  }
}
