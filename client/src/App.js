import React, { useState, useEffect } from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayArea from './components/PlayArea';
import DiscardPile from './components/DiscardPile';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import playArea from "./components/PlayArea";
import axios from 'axios';
import discardPile from "./components/DiscardPile";

function App() {
  const [state, setState] = useState({
    deck: [],
    hand: [],
    playArea: [],
    discard: []
  });

  const deckId = 5; // This could be dynamic based on user selection or routing

  useEffect(() => {
    axios.get(`http://localhost:3001/deck/${deckId}`)
      .then(response => {
        const initialDeck = response.data.map(card => ({
          id: card.id,         // Unique ID for instance
          cardid: card.cardid, // Original card ID
          text: card.filename, // Assuming 'filename' is used as 'text'
          source: 'deck'
        }));
        setState(prevState => ({
          ...prevState,
          deck: initialDeck
        }));
      })
      .catch(error => {
        console.error('Error fetching deck:', error);
      });
  }, [deckId]);

  // Function to draw a card from the deck and add to the hand
  const drawCard = () => {
    if (state.deck.length > 0) {
      const cardToDraw = state.deck[0];
      // Fetch the filename from the server
      axios.get(`http://localhost:3001/cards/${cardToDraw.cardid}`) //make this port dynamic too
        .then(response => {
          const newCard = {
            ...cardToDraw,
            text: response.data.filename, // Set the filename as text
            source: 'hand'
          };
          const newDeck = state.deck.slice(1);
          setState(prevState => ({
            ...prevState,
            deck: newDeck,
            hand: [...prevState.hand, newCard]
          }));
        })
        .catch(error => {
          console.error('Error fetching card details:', error);
        });
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
