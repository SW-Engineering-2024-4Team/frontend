import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const BoardGame = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [playerId, setPlayerId] = useState(null); // 플레이어 ID 상태
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 상태

  useEffect(() => {
    socket = io({
      path: '/api/socket',
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('assignId', (id) => {
      console.log('Assigned player ID:', id); // 디버깅을 위한 로그
      setPlayerId(id);
    });

    socket.on('startGame', () => {
      console.log('Game started');
      setIsGameStarted(true);
    });

    socket.on('receiveMessage', (msg) => {
      console.log('Message received:', msg); // 디버깅을 위한 로그
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = { playerId, text: message };
      socket.emit('sendMessage', msg);
      setMessage('');
    }
  };

  if (!isGameStarted) {
    return (
      <div>
        <h1>Waiting for players...</h1>
        <p>Waiting for 4 players to join the game.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>4 Player Board Game</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <p key={index}>
            Player {msg.playerId}: {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BoardGame;
