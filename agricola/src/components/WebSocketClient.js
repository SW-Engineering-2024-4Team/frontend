import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketClient = forwardRef(({ roomId, onMessageReceived }, ref) => {
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8091/agricola-service');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      }
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe(`/topic/room/${roomId}`, (messageOutput) => {
        onMessageReceived(JSON.parse(messageOutput.body));
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId, onMessageReceived]);

  useImperativeHandle(ref, () => ({
    sendMessage: (destination, message) => {
      if (stompClientRef.current && stompClientRef.current.connected) {
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
