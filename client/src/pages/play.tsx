import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPlayerData, startGame, subscribeToGameSession, updateCurrentTurnPlayer } from '../util/firebaseClient'; // Adjust the import path as necessary
import PlayLayout from "@/components/layout/PlayLayout";
import { getFunctions, httpsCallable } from "firebase/functions";
import Hand from '@/components/Play/Hand';
import PlayerPlayArea from '@/components/Play/PlayerPlayArea';
import OtherPlayersContainer from '@/components/Play/OtherPlayersContainer';


const Play = () => {
  const router = useRouter();
  const { gameSessionId, playerId } = router.query; // Extract parameters from query
  const [deckId, setDeckId] = useState('');
  const [cardId, setCardId] = useState(''); // State to hold the card ID being played
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState('');
  const [hand, setHand] = useState([]); // State to hold the player's hand
  const [selectedCardId, setSelectedCardId] = useState('');
  const [playArea, setPlayArea] = useState([]); // State to hold the player's play area
  const [otherPlayers, setOtherPlayers] = useState([]); // State to hold other players' data

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

        if (gameSession.players && gameSession.players[playerId]) {
          const playerData = gameSession.players[playerId];
          setHand(Object.values(playerData.hand || {}));

          // Reconstruct ordered play area for the current player
          const orderedPlayArea = [];
          let currentCardId = playerData.firstPlayedCardId;

          while (currentCardId) {
            orderedPlayArea.push(currentCardId);
            const currentCard = playerData.playArea[currentCardId];
            currentCardId = currentCard.nextCardId;
          }

          setPlayArea(orderedPlayArea);
        }

        // Gather data for other players
        const otherPlayersData = Object.keys(gameSession.players)
          .filter(id => id !== playerId)
          .map(id => {
            const player = gameSession.players[id];
            const orderedPlayArea = [];
            let currentCardId = player.firstPlayedCardId;

            while (currentCardId) {
              orderedPlayArea.push(currentCardId);
              const currentCard = player.playArea[currentCardId];
              currentCardId = currentCard.nextCardId;
            }

            return {
              id,
              deckId: player.deckId,
              playArea: orderedPlayArea,
            };
          });

        setOtherPlayers(otherPlayersData);
      });
    }
  }, [gameSessionId, playerId]);

  const handleCardIdChange = (e) => {
    setCardId(e.target.value);
  };

  const handleStartGame = () => {
    if (gameSessionId) {
      const functions = getFunctions();
      const shuffle = httpsCallable(functions, 'shuffle');

      startGame(gameSessionId)
        .then(() => {
          console.log('Game started successfully');

          return shuffle({ gameSessionId });
        })
        .then(() => {
          console.log('Decks shuffled successfully');
        })
        .catch((error) => {
          console.error('Error starting game or shuffling decks:', error);
        });
    }
  };

  const handlePlayCard = (e) => {
    e.preventDefault();
    if (gameSessionId && playerId && selectedCardId) {
      const functions = getFunctions();
      const recordMove = httpsCallable(functions, 'recordMove');
      console.log(otherPlayers);
      recordMove({ gameSessionId, playerId, cardId: selectedCardId })
        .then(() => {
          setSelectedCardId(''); // Clear the selected card ID
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
          console.log(cardId, gameSessionId, playerId);
        });
    }
  };

  const handleDrawCard = () => {
    if (gameSessionId && playerId) {
      const functions = getFunctions();
      const drawCard = httpsCallable(functions, 'drawCard');

      drawCard({ gameSessionId, playerId })
        .then((result) => {
          const newCard = result.data.card;
          setHand([...hand, newCard]);
          console.log('Card drawn successfully:', newCard);
        })
        .catch((error) => {
          console.error('Error drawing card:', error);
        });
    }
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
  };


  return (
    <PlayLayout>
      <div>
        <h1>Deck ID: {deckId}</h1>
        {deckId ? <p>The deck ID for this player is: {deckId}</p> : <p>Loading deck information...</p>}
        {currentTurnPlayerId === playerId ? (
          <>
            <button onClick={handlePlayCard} disabled={!selectedCardId}>Play Card</button>
          </>
        ) : (
          <p>It's {currentTurnPlayerId}'s turn</p>
        )}
        {!isGameActive && <button onClick={handleStartGame}>Start Game</button>}
        <button onClick={handleDrawCard}>Draw Card</button>

        <h2>Hand</h2>
        <Hand cards={hand} onCardClick={handleCardClick} />


        <h2>Play Area</h2>
        <PlayerPlayArea playArea={playArea} />
        <h2>Other Players</h2>
        <OtherPlayersContainer otherPlayers={otherPlayers} currentTurnPlayerId={currentTurnPlayerId} />

      </div>
    </PlayLayout>
  );
};

export default Play;
