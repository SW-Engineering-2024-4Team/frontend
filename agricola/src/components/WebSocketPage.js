import React, { useState, useRef } from 'react';
import WebSocketClient from './WebSocketClient';

const WebSocketPage = () => {
  const initialPlayers = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Alice' },
    { id: '3', name: 'Bob' },
    { id: '4', name: 'Emily' }
  ];
  const [players] = useState(initialPlayers);

  const sendMessageRef = useRef(null);

  const handleSendMessage = () => {
    if (sendMessageRef.current) {
      const messageJSON = JSON.stringify({ players });
      sendMessageRef.current('/app/room/1/start', messageJSON);
      console.log('SEND INIT', messageJSON);
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
