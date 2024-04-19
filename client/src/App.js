import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useState } from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayArea from './components/PlayArea';
import DiscardPile from './components/DiscardPile';
import './App.css';

function App() {
  const initialDeck = Array.from({ length: 50 }, (_, i) => `Card ${i + 1}`);
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState([]);
  const [discard, setDiscard] = useState([]);

  const drawCard = () => {
    if (deck.length > 0) {
      const newCard = deck[0];
      const newDeck = deck.slice(1);
      setDeck(newDeck);
      setHand([...hand, newCard]);
    }
  };
  const handleDrop = (item) => {
    setDiscard([...discard, item.id]);
    setHand(hand.filter(card => card !== item.id));
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Deck onDraw={drawCard} />
        <div>
          <PlayArea />
          <Hand cards={hand} />
        </div>
        <DiscardPile cards={discard} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
}

export default App;
