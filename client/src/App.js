import React, { useState } from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayArea from './components/PlayArea';
import DiscardPile from './components/DiscardPile';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';  // Ensure CSS is being imported

function App() {
  const initialDeck = Array.from({ length: 50 }, (_, i) => `Card ${i + 1}`);
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [playArea, setPlayArea] = useState([]);

  const drawCard = () => {
    if (deck.length > 0) {
      const newCard = deck[0];
      const newDeck = deck.slice(1);
      setDeck(newDeck);
      setHand([...hand, newCard]);
    }
  };

  const handleDropToDiscard = (item) => {
    setDiscard([...discard, item.id]);
    setHand(hand.filter(card => card !== item.id));
  };

  const handleDropToPlayArea = (item) => {
    setPlayArea([...playArea, item.id]); // Add the card to the play area
    setHand(hand.filter(card => card !== item.id)); // Remove from hand
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="game-area">
          <Deck onDraw={drawCard} />
          <PlayArea cards={playArea} onDrop={handleDropToPlayArea} />
          <DiscardPile cards={discard} onDrop={handleDropToDiscard} />
        </div>
        <Hand cards={hand} />
      </div>
    </DndProvider>
  );
}

export default App;
