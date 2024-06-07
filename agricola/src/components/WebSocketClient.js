import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketClient = forwardRef(({ roomId, onMessageReceived }, ref) => {
  const stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8091/agricola-service');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        setConnected(true);
        stompClient.subscribe(`/topic/room/${roomId}`, (messageOutput) => {
          onMessageReceived(JSON.parse(messageOutput.body));
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setConnected(false);
      }
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        setConnected(false);
      }
    };
  }, [roomId, onMessageReceived]);

  useImperativeHandle(ref, () => ({
    sendMessage: (destination, message) => {
      if (connected && stompClientRef.current) {
        stompClientRef.current.publish({
          destination,
          body: message,
        });
      } else {
        console.log('STOMP client is not connected');
      }
    }
  }));

  return null;
});

export default WebSocketClient;
