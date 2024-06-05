import React, { useState, useRef } from 'react';
import WebSocketClient from './WebSocketClient';

const WebSocketPage = () => {
  const initialPlayers = ['고도희', '정지윤', '김윤재', '이수빈'];
  const [players] = useState(initialPlayers);

  const sendMessageRef = useRef(null); // WebSocketClient 참조를 위한 ref

  // 백엔드에게 메시지 전송
  const handleSendMessage = () => {
    if (sendMessageRef.current) {
      const messageJSON = JSON.stringify({ players });
      sendMessageRef.current('/app/room/1/start', messageJSON);
      console.log('SEND INIT');
    }
  };

  return (
    <div>
      <WebSocketClient
        roomId="1"
        onMessageReceived={(message) => console.log('Received message:', message)}
        ref={(client) => {
          if (client) {
            sendMessageRef.current = client.sendMessage;
          }
        }}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketPage;
