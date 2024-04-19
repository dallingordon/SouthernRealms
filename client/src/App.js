import React, { useState } from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayArea from './components/PlayArea';
import DiscardPile from './components/DiscardPile';
import Card from './components/Card';  // Import Card component
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const initialDeck = Array.from({ length: 50 }, (_, i) => ({
    id: `Card${i + 1}`,
    text: `Card ${i + 1}`
  }));
  /* console.log(initialDeck); */
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [playArea, setPlayArea] = useState([]);

  const drawCard = () => {
    if (deck.length > 0) {
      const newCard = deck[0];
      /* console.log(newCard); works */
      const newDeck = deck.slice(1);
      setDeck(newDeck);
      setHand([...hand, newCard]);

    }
  };

  const handleDropToDiscard = (item) => {
    setDiscard([...discard, item]);
    setHand(hand.filter(card => card !== item.id));
  };

  const handleDropToPlayArea = (item) => {
    setPlayArea([...playArea, item]); // Add the card to the play area
    setHand(hand.filter(card => card !== item.id)); // Remove from hand
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="game-area">
          <Deck onDraw={drawCard} />
          <PlayArea cards={playArea.map(card =>
            <Card  id={card.id} text={card.text} onMoveCard={handleDropToPlayArea} />
          )} />
          <DiscardPile cards={discard.map(card =>
            <Card id={card.id} text={card.text} onMoveCard={handleDropToDiscard} />
          )} />
        </div>
        <Hand cards={hand} setCards={setHand} />
      </div>
    </DndProvider>
  );
}

export default App;
