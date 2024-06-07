import React, { createContext, useContext, useState } from 'react';

// 컨텍스트 생성
const PlayerContext = createContext();

// 컨텍스트 제공자 컴포넌트
export const PlayerProvider = ({ children }) => {
  const [clickedPlayer, setClickedPlayer] = useState('');

  return (
    <PlayerContext.Provider value={{ clickedPlayer, setClickedPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

// 클릭된 플레이어를 가져오는 커스텀 훅
export const usePlayer = () => {
  return useContext(PlayerContext);
};
