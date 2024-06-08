import React, { useState, useRef } from 'react';
import WebSocketClient from '../components/WebSocketClient';

const AgricolaGame = () => {
  const [gameState, setGameState] = useState("");
  const [currentPlayerID, setCurrentPlayerID] = useState("1"); // 기본값으로 "1" 설정
  const roomId = "1234"; // Example room ID
  const stompClientRef = useRef(null);

  const handleGameState = (gameState) => {
    setGameState(prevState => prevState + "\n" + JSON.stringify(gameState, null, 2));
  };

  const startGame = () => {
    const payload = {
      roomNumber: roomId,
      players: [
        { id: '1', name: 'Player 1' },
        { id: '2', name: 'Player 2' },
        { id: '3', name: 'Player 3' },
        { id: '4', name: 'Player 4' }
      ]
    };
    console.log('Sending startGame payload:', payload);
    stompClientRef.current.sendMessage('/app/room/' + roomId + '/start', JSON.stringify(payload));
  };

  const viewExchangeableCards = () => {
    const payload = {
      playerId: currentPlayerID
    };
    console.log('Requesting exchangeable cards for player:', currentPlayerID);
    stompClientRef.current.sendMessage('/app/viewExchangeableCards', JSON.stringify(payload));
  };

  const sendCardId = (cardId) => {
    if (cardId) {
      selectCard(cardId);
    } else {
      alert('Please enter a card ID');
    }
  };

  const selectCard = (cardId) => {
    const payload = {
      playerId: currentPlayerID, // 상태 변수 참조
      cardId: cardId
    };
    console.log('Selecting card with ID:', cardId);
    stompClientRef.current.sendMessage('/app/receivePlayerTurn', JSON.stringify(payload));
  };

  return (
    <div>
      <h1>Agricola Game</h1>
      <button onClick={startGame} id="startGameButton">Start Game</button>
      <button onClick={viewExchangeableCards} id="viewExCardsButton">View Exchangeable Cards</button>
      <div className="input-section">
        <label htmlFor="cardIdInput">Enter Card ID: </label>
        <input type="number" id="cardIdInput" />
        <button onClick={() => sendCardId(document.getElementById('cardIdInput').value)}>Send Card ID</button>
      </div>
      <pre id="gameState">{gameState}</pre>
      <WebSocketClient ref={stompClientRef} roomId={roomId} onMessageReceived={handleGameState} />

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        #startGameButton, #viewExCardsButton {
          display: block;
          margin: 20px 0;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        #startGameButton:hover, #viewExCardsButton:hover {
          background-color: #0056b3;
        }
        #gameState {
          margin-top: 20px;
          white-space: pre-wrap;
          font-family: monospace;
          background-color: #f8f9fa;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: auto;
          max-height: 500px;
        }
        .input-section {
          margin-top: 20px;
        }
        .input-section input {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default AgricolaGame;
