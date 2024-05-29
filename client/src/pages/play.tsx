import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPlayerData, startGame, subscribeToGameSession, updateCurrentTurnPlayer } from '../util/firebaseClient';
import PlayLayout from "@/components/layout/PlayLayout";
import { getFunctions, httpsCallable } from "firebase/functions";
import Hand from '@/components/Play/Hand';
import PlayerPlayArea from '@/components/Play/PlayerPlayArea';
import OtherPlayersContainer from '@/components/Play/OtherPlayersContainer';

const Play = () => {
  const router = useRouter();
  const { gameSessionId, playerId } = router.query;
  const [deckId, setDeckId] = useState('');
  const [cardId, setCardId] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState('');
  const [hand, setHand] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [playArea, setPlayArea] = useState({ cards: [], score: 0 }); // Updated state
  const [otherPlayers, setOtherPlayers] = useState([]); // Updated state

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
          const handWithImages = Object.values(playerData.hand || {}).map(card => ({
            ...card,
            imgUrl: card.filename || 'default-image-url'
          }));
          setHand(handWithImages);

          const orderedPlayArea = [];
          let currentCardId = playerData.firstPlayedCardId;

          while (currentCardId) {
            const currentCard = playerData.playArea[currentCardId];
            orderedPlayArea.push({
              id: currentCardId,
              imgUrl: currentCard.filename || 'default-image-url',
              deactivated: currentCard.deactivated,
            });
            currentCardId = currentCard.nextCardId;
          }

          setPlayArea({ cards: orderedPlayArea, score: playerData.score });
        }

        const otherPlayersData = Object.keys(gameSession.players)
          .filter(id => id !== playerId)
          .map(id => {
            const player = gameSession.players[id];
            const orderedPlayArea = [];
            let currentCardId = player.firstPlayedCardId;

            while (currentCardId) {
              const currentCard = player.playArea[currentCardId];
              orderedPlayArea.push({
                id: currentCardId,
                imgUrl: currentCard.filename || 'default-image-url',
                deactivated: currentCard.deactivated,
              });
              currentCardId = currentCard.nextCardId;
            }

            return {
              id,
              deckId: player.deckId,
              playArea: orderedPlayArea,
              score: player.score,
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
      const drawCards = httpsCallable(functions, 'drawCard');

      startGame(gameSessionId)
        .then(() => {
          console.log('Game started successfully');
          return shuffle({ gameSessionId });
        })
        .then(() => {
          console.log('Decks shuffled successfully');

          return new Promise((resolve, reject) => {
            subscribeToGameSession(gameSessionId, (gameSession) => {
              resolve(Object.keys(gameSession.players));
            });
          });
        })
        .then((playerIds) => {
          const drawCardsForPlayer = (playerId) => {
            return drawCards({ gameSessionId, playerId, numberOfCards: 12 });
          };

          const drawCardsForAllPlayers = (index) => {
            if (index < playerIds.length) {
              return drawCardsForPlayer(playerIds[index])
                .then(() => drawCardsForAllPlayers(index + 1));
            } else {
              return Promise.resolve();
            }
          };

          return drawCardsForAllPlayers(0);
        })
        .then(() => {
          console.log('Cards drawn successfully for all players');
          subscribeToGameSession(gameSessionId, (gameSession) => {
            if (gameSession.players && gameSession.players[playerId]) {
              const playerData = gameSession.players[playerId];
              const handWithImages = Object.values(playerData.hand || {}).map(card => ({
                ...card,
                imgUrl: card.filename || 'default-image-url'
              }));
              setHand(handWithImages);
            }
          });
        })
        .catch((error) => {
          console.error('Error starting game or drawing cards:', error);
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
          setSelectedCardId('');
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

  const handleCardClick = (cardId) => {
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

        <h2>Hand</h2>
        <Hand cards={hand} onCardClick={handleCardClick} />

        <h2>Play Area</h2>
        <PlayerPlayArea playArea={playArea.cards} score={playArea.score} />

        <h2>Other Players</h2>
        <OtherPlayersContainer otherPlayers={otherPlayers} currentTurnPlayerId={currentTurnPlayerId} />
      </div>
    </PlayLayout>
  );
};

export default Play;
