import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import io from "socket.io-client";

// 페이지 불러오기
import GamePage from "../components/GamePage";
import LoginPage from "../components/LoginPage";
import WebSocketClient from "../components/WebSocketClient";
import { PlayerProvider } from '@/components/PlayerContext';

let socket;

export default function Room() {
  const router = useRouter();
  const { room, name } = router.query; // URL 쿼리에서 room과 name 가져오기

  const [name2, setName2] = useState(name); // 플레이어 이름 상태
  const [path, setPath] = useState(''); // 현재 경로 상태 (방 이름, 플레이어 이름 포함)
  const [message, setMessage] = useState(''); // 채팅 메시지 상태
  const [messages, setMessages] = useState([]); // 채팅 메시지 목록 상태
  const [playerId, setPlayerId] = useState(null); // 플레이어 ID 상태
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 상태
  const [players, setPlayers] = useState([]); // 플레이어 목록 상태

  const webSocketClientRef = useRef(null); // 웹소켓 클라이언트 레퍼런스
  const sendMessageRef = useRef(null); // 메시지 전송 함수 레퍼런스

  // 컴포넌트가 마운트될 때 및 name과 room 변경될 때 실행
  useEffect(() => {
    if (!socket && name && room) {
      socketInitializer(name, room);
    }
  }, [name, room]);

  // 소켓 초기화 함수
  const socketInitializer = async (name_, room_) => {
    try {
      console.log("소켓 초기화 중");
      await fetch("/api/socket"); // 서버에서 소켓 초기화
      socket = io({
        path: '/api/socket',
      });

      // 소켓 연결 시 실행
      socket.on("connect", () => {
        console.log('서버에 연결됨');
        if (name_ && room_) joinRoom(room_, name_);
      });

      // 서버로부터 플레이어 ID 할당 받음
      socket.on('assignId', (id) => {
        console.log('플레이어 ID 할당됨:', id); // 디버깅을 위한 로그
        setPlayerId(id);
      });

      // 게임 시작 이벤트 수신
      socket.on('startGame', (playerList) => {
        console.log('게임 시작됨');
        setIsGameStarted(true);
      });

      // 메시지 수신 이벤트
      socket.on('receiveMessage', (msg) => {
        console.log('메시지 수신됨:', msg); // 디버깅을 위한 로그
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

    } catch (e) {
      console.log("에러 발생: ", e);
    }
  };

  // 메시지 전송 함수
  const sendMessage = (text) => {
    if (text.trim()) {
      const msg = { playerId, text };
      if (sendMessageRef.current) {
        sendMessageRef.current(msg); // WebSocketClient를 통한 메시지 전송
      } else {
        socket.emit('sendMessage', msg); // 소켓을 통한 메시지 전송
      }
      setMessage('');
    }
  };

  // 방에 참여하는 함수
  const joinRoom = (room_, name_) => {
    socket.emit("join-room", room_, name_);
    setName2(name_);
    setPath("game");
  };

  // 게임 화면을 렌더링하는 함수
  const displayGame = () => {
    return (
      <div>
        <PlayerProvider>
        <WebSocketClient
          roomId="1"
          onMessageReceived={(message) => console.log('Received message:', message)}
          ref={(client) => {
            if (client) {
              sendMessageRef.current = client.sendMessage;
            }
          }}
        />
        <GamePage 
          currentPlayer={playerId}
          sendMessage={sendMessage}
          messages={messages}
          message={message}
          setMessage={setMessage}
        />
        </PlayerProvider>
      </div>
    );
  };

  // 게임이 시작되지 않았을 때 대기 화면
  if (!isGameStarted) {
    return (
      <div>
        <h1>플레이어 대기 중...</h1>
        <p>4명의 플레이어가 게임에 참가할 때까지 기다리고 있습니다.</p>
      </div>
    );
  }

  // 경로에 따라 다른 화면을 렌더링
  switch (path) {
    case "game":
      return displayGame();
    default:
      return (
        <>
          <p>내 이름: {name} 방 이름: {room}</p>
          {name == undefined && (
            <LoginPage type="room" btnFunction={joinRoom} room={room} />
          )}
          <WebSocketClient ref={webSocketClientRef} roomId={room} onMessageReceived={(msg) => {
            console.log('STOMP 메시지 수신됨:', msg);
          }} />
        </>
      );
  }
}
