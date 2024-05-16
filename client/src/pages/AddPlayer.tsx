import React, { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import HomeLayout from "@/components/layout/HomeLayout";
import { getDecks, getActiveGames } from '../util/firebaseClient';

function AddPlayer() {
  const [decks, setDecks] = useState([]);
  const [games, setGames] = useState([]);
  const [userId, setUserId] = useState('');
  const [deckId, setDeckId] = useState('');
  const [gameId, setGameId] = useState('');
  const functions = getFunctions();

  useEffect(() => {
    const fetchDecksAndGames = async () => {
      const fetchedDecks = await getDecks();
      const fetchedGames = await getActiveGames();
      // Store only necessary data for dropdowns
      setDecks(fetchedDecks.map(deck => ({ id: deck, name: deck })));
      setGames(fetchedGames.map(game => ({ sessionId: game })));
    };
    fetchDecksAndGames();
  }, []);

  const joinGame = async () => {
    const joinGameFunction = httpsCallable(functions, 'joinGame');
    try {
      console.log({ userId, deckId, gameId });
      const response = await joinGameFunction({ userId, deckId, gameId });
      console.log('Join game response:', response);
      alert(`Successfully joined game: ${response}`);
    } catch (error) {
      console.error('Error joining game:', error);
      alert('Failed to join game. Please check the console for more details.');
    }
  };

  return (
    <HomeLayout>
      <h1>Join a Game</h1>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Choose a Deck:</label>
        <select value={deckId} onChange={(e) => setDeckId(e.target.value)}>
          {decks.map(deck => (
            <option key={deck.id} value={deck.id}>{deck.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Choose a Game:</label>
        <select value={gameId} onChange={(e) => setGameId(e.target.value)}>
          {games.map(game => (
            <option key={game.sessionId} value={game.sessionId}>
              Game {game.sessionId}
            </option>
          ))}
        </select>
      </div>
      <button onClick={joinGame}>Join Game</button>
    </HomeLayout>
  );
}

export default AddPlayer;
