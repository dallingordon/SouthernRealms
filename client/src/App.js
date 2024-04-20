import React, { useState } from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayArea from './components/PlayArea';
import DiscardPile from './components/DiscardPile';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import playArea from "./components/PlayArea";
import discardPile from "./components/DiscardPile";

function App() {
  const initialDeck = Array.from({ length: 50 }, (_, i) => ({
    id: `Card${i + 1}`,
    text: `Card ${i + 1}`,
    source: 'deck' // Initialize all cards in the deck with 'deck' as the source
  }));

  const [state, setState] = useState({
    deck: initialDeck,
    hand: [],
    playArea: [],
    discard: []
  });

  // Function to draw a card from the deck and add to the hand
  const drawCard = () => {
    if (state.deck.length > 0) {
      const newCard = { ...state.deck[0], source: 'hand' }; // Set the source to 'hand' when drawing
      const newDeck = state.deck.slice(1);
      setState(prevState => ({
        ...prevState,
        deck: newDeck,
        hand: [...prevState.hand, newCard]
      }));
    }
  };

  // Generalized function to move cards between areas
  const moveCard = (cardId, target) => {

    const sourceAreas = ['deck', 'hand', 'playArea', 'discard'];
    const source = sourceAreas.find(area => state[area].some(card => card.id === cardId));

    if (!source || source === target) return; // Exit if no source found or source and target are the same

    const cardIndex = state[source].findIndex(card => card.id === cardId);
    if (cardIndex === -1) return; // Exit if card is not found

    let card = { ...state[source][cardIndex], source: target }; // Update the card's source to the new area

    // Update state to move card from source to target
    setState(prevState => ({
      ...prevState,
      [source]: prevState[source].filter((_, index) => index !== cardIndex),
      [target]: [...prevState[target], card]
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="game-area">
          <Deck onDraw={drawCard} />
          <Hand cards={state.hand} moveCard={(cardId) => moveCard(cardId, 'hand')} />
          <PlayArea cards={state.playArea} moveCard={(cardId) => moveCard(cardId, 'playArea')} />
          <DiscardPile cards={state.discard} moveCard={(cardId) => moveCard(cardId, 'discard')} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
