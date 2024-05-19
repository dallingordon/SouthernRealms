import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPlayerData, recordMove, startGame, subscribeToGameSession, updateCurrentTurnPlayer } from '../util/firebaseClient'; // Adjust the import path as necessary
import PlayLayout from "@/components/layout/PlayLayout";
import { getFunctions, httpsCallable } from "firebase/functions";

const Play = () => {
  const router = useRouter();
  const { gameSessionId, playerId } = router.query; // Extract parameters from query
  const [deckId, setDeckId] = useState('');
  const [cardId, setCardId] = useState(''); // State to hold the card ID being played
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState('');

  useEffect(() => {
    if (gameSessionId && playerId) {
      getPlayerData(gameSessionId, playerId)
        .then((deckId) => {
          setDeckId(deckId);
        })
        .catch((error) => {
          console.error('Error getting player data:', error);
        });

      subscribeToGameSession(gameSessionId, (gameSession) => {
        setIsGameActive(gameSession.isGameActive);
        setCurrentTurnPlayerId(gameSession.currentTurnPlayerId);
      });
    }
  }, [gameSessionId, playerId]);

  const handleCardIdChange = (e) => {
    setCardId(e.target.value);
  };


  const handleStartGame = () => {
    if (gameSessionId) {
      startGame(gameSessionId)
        .then(() => {
          console.log('Game started successfully');
        })
        .catch((error) => {
          console.error('Error starting game:', error);
        });
    }
  };

  const handlePlayCard = (e) => {
    e.preventDefault();
    if (gameSessionId && playerId && cardId) {
      const functions = getFunctions();
      const recordMove = httpsCallable(functions, 'recordMove');

      recordMove({ gameSessionId, playerId, cardId })
        .then(() => {
          setCardId(''); // Clear the card ID field after recording the move
          updateCurrentTurnPlayer(gameSessionId, playerId)
            .then(() => {
              console.log('Turn updated successfully');
            })
            .catch((error) => {
              console.error('Error updating turn:', error);
            });
        })
        .catch((error) => {
          console.error('Error recording move:', error);
        });
    }
  };

   return (
    <PlayLayout>
      <div>
        <h1>Deck ID: {deckId}</h1>
        {deckId ? <p>The deck ID for this player is: {deckId}</p> : <p>Loading deck information...</p>}
        {currentTurnPlayerId === playerId ? (
          <form onSubmit={handlePlayCard}>
            <label>
              Card ID:
              <input type="text" value={cardId} onChange={handleCardIdChange} required />
            </label>
            <button type="submit">Play Card</button>
          </form>
        ) : (
          <p>It's {currentTurnPlayerId}'s turn</p>
        )}
        {!isGameActive && <button onClick={handleStartGame}>Start Game</button>}
      </div>
    </PlayLayout>
  );
};

export default Play;
