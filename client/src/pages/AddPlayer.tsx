import React, { useState, useEffect } from 'react';
import { db } from '../util/firebaseClient'; // Adjust the path as necessary
import { ref, onValue } from 'firebase/database';

const AddPlayer = () => {
  const [playerID, setPlayerID] = useState('');
  const [deckId, setDeckId] = useState('');
  const [gameSessionId, setGameSessionId] = useState('');
  const [decks, setDecks] = useState<{ id: string, name: string }[]>([]);

  // Fetch decks from Firebase
  useEffect(() => {
    const decksRef = ref(db, 'app/decks');
    onValue(decksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedDecks = [];
      for (const key in data) {
        loadedDecks.push({ id: key, name: data[key].name }); // Assuming each deck has a 'name'
      }
      setDecks(loadedDecks);
    });
  }, []);

  const handleSubmit = async () => {
    // Logic to initialize Player with selected deck and player ID
    console.log("Submitting:", playerID, deckId, gameSessionId);
    // You'll need to replace this with actual logic to create or update a Player in your database
  };

  return (
    <div>
      <h1>Add Player to Game</h1>
      <input
        type="text"
        value={gameSessionId}
        onChange={(e) => setGameSessionId(e.target.value)}
        placeholder="Enter Game Session ID"
      />
      <input
        type="text"
        value={playerID}
        onChange={(e) => setPlayerID(e.target.value)}
        placeholder="Enter Player ID"
      />
      <select value={deckId} onChange={(e) => setDeckId(e.target.value)}>
        <option value="">Select a Deck</option>
        {decks.map(deck => (
          <option key={deck.id} value={deck.id}>{deck.name}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Add Player</button>
    </div>
  );
};

export default AddPlayer;
