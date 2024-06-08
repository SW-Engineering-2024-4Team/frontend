import React, { createContext, useContext, useState } from 'react';

// 컨텍스트 생성
const CardContext = createContext();

// 컨텍스트 제공자 컴포넌트
export const CardProvider = ({ children }) => {
  const [deckCard1, setDeckCard1] = useState([]);
  const [deckCard2, setDeckCard2] = useState([]);
  const [deckCard3, setDeckCard3] = useState([]);
  const [deckCard4, setDeckCard4] = useState([]);

  return (
    <CardContext.Provider value={{ deckCard1, setDeckCard1, deckCard2, setDeckCard2, deckCard3, setDeckCard3, deckCard4, setDeckCard4 }}>
      {children}
    </CardContext.Provider>
  );
};

// 커스텀 훅
export const useDeckCard1 = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useDeckCard1 must be used within a CardProvider');
  }
  return { deckCard1: context.deckCard1, setDeckCard1: context.setDeckCard1 };
};

export const useDeckCard2 = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useDeckCard2 must be used within a CardProvider');
  }
  return { deckCard2: context.deckCard2, setDeckCard2: context.setDeckCard2 };
};

export const useDeckCard3 = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useDeckCard3 must be used within a CardProvider');
  }
  return { deckCard3: context.deckCard3, setDeckCard3: context.setDeckCard3 };
};

export const useDeckCard4 = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useDeckCard4 must be used within a CardProvider');
  }
  return { deckCard4: context.deckCard4, setDeckCard4: context.setDeckCard4 };
};
