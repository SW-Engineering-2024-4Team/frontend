import React, { useState } from 'react';

// 플레이어 상태를 관리하는 함수형 컴포넌트
const PlayerComponent = () => {
  const [currentPlayer, setCurrentPlayer] = useState('');

  return (
    <div>
      <button onClick={() => setCurrentPlayer('Player1')}>Player1</button>
      <button onClick={() => setCurrentPlayer('Player2')}>Player2</button>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
};

// 클릭된 플레이어를 가져오는 함수
export function getClickedPlayer() {
  return currentPlayer;
}

// 클릭된 플레이어를 설정하는 함수
export function setClickedPlayer(player) {
  setCurrentPlayer(player);
}

export default PlayerComponent;
