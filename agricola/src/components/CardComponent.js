import React from 'react';
import { useDeckCard1, useDeckCard2, useDeckCard3, useDeckCard4 } from './CardContext';

const CardComponent = () => {
  const { deckCard1, setDeckCard1 } = useDeckCard1();
  const { deckCard2, setDeckCard2 } = useDeckCard2();
  const { deckCard3, setDeckCard3 } = useDeckCard3();
  const { deckCard4, setDeckCard4 } = useDeckCard4();

  return (
    <div>
      <button onClick={() => setDeckCard1([])}>Clear Player 1 Deck</button>
      <button onClick={() => setDeckCard2([])}>Clear Player 2 Deck</button>
      <button onClick={() => setDeckCard3([])}>Clear Player 3 Deck</button>
      <button onClick={() => setDeckCard4([])}>Clear Player 4 Deck</button>
      <p>Player 1 Deck: {JSON.stringify(deckCard1)}</p>
      <p>Player 2 Deck: {JSON.stringify(deckCard2)}</p>
      <p>Player 3 Deck: {JSON.stringify(deckCard3)}</p>
      <p>Player 4 Deck: {JSON.stringify(deckCard4)}</p>
    </div>
  );
};

export default CardComponent;
