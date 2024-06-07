import React from 'react';
import { usePlayer } from './PlayerContext';

// 플레이어 상태를 관리하는 함수형 컴포넌트
const PlayerComponent = () => {
  const { currentPlayer, setCurrentPlayer } = usePlayer();

  return (
    <div>
      <button onClick={() => setCurrentPlayer('Player1')}>Player1</button>
      <button onClick={() => setCurrentPlayer('Player2')}>Player2</button>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
};

export default PlayerComponent;
