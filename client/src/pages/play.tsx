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
  const [isSpecialCardSelected, setIsSpecialCardSelected] = useState(false);
  const [extraCardId, setExtraCardId] = useState('');

  const [isSelectingPlayAreaCard, setIsSelectingPlayAreaCard] = useState(false); // New state
  const [extraData, setExtraData] = useState(null);

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
              cardInputData: currentCard.cardInputData,
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
                cardInputData: currentCard.cardInputData,
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

      recordMove({ gameSessionId, playerId, cardId: selectedCardId, extraData: JSON.stringify(extraData) })
        .then(() => {
          setSelectedCardId('');
          setExtraData(null); // Reset extra data
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
    const selectedCard = hand.find(card => card.id === cardId);
    //console.log(selectedCard.cardInputData);
    if (isSpecialCardSelected) {
      // If a special card is already selected, this should be the extra card
      console.log(cardId);
      setExtraData({ discardCardId: cardId });
      setExtraCardId(cardId);
      setIsSpecialCardSelected(false); // Reset special card selection
    } else if (selectedCard.type === 'Special' && selectedCard.cardInputData === 'singleCardPlayerHand') {
      // If the clicked card is special and requires extra card input from player's hand
      setSelectedCardId(cardId);
      setIsSpecialCardSelected(true);
      setExtraCardId('');
    } else if (selectedCard.type === 'Special' && selectedCard.cardInputData === 'singleCardPlayerPlayArea') {
      // If the clicked card is special and requires extra card input from player's play area
      setSelectedCardId(cardId);
      setIsSelectingPlayAreaCard(true);
      setExtraCardId('');
    } else {
      // Normal card selection
      setSelectedCardId(cardId);
    }
  };

  const handlePlayAreaCardClick = (cardId) => {
    if (isSelectingPlayAreaCard) {
      // If a card is being selected for the special card input from the play area
      setExtraData({ playAreaCardId: cardId });
      setIsSelectingPlayAreaCard(false); // Reset play area card selection
      setIsSpecialCardSelected(false); // Reset special card selection
    } else {
      // Normal card selection from play area (if needed)
      setSelectedCardId(cardId);
    }
  };

  const undoSpecialCardSelection = () => {
    setSelectedCardId('');
    setIsSpecialCardSelected(false);
    setExtraData(null);
    setIsSelectingPlayAreaCard(false); // Reset play area card selection
  };

  return (
    <PlayLayout>
      <div>
        <h1>Deck ID: {deckId}</h1>
        {deckId ? <p>The deck ID for this player is: {deckId}</p> : <p>Loading deck information...</p>}
        {currentTurnPlayerId === playerId ? (
          <>
            <button onClick={handlePlayCard} disabled={!selectedCardId}>Play Card</button>
            {isSpecialCardSelected && <button onClick={undoSpecialCardSelection}>Undo Special Card Selection</button>}
          </>
        ) : (
          <p>It's {currentTurnPlayerId}'s turn</p>
        )}
        {!isGameActive && <button onClick={handleStartGame}>Start Game</button>}

        <h2>Hand</h2>
        <Hand cards={hand}
              onCardClick={handleCardClick}
              isSpecialCardSelected={isSpecialCardSelected}
              selectedCardId={selectedCardId}
              extraCardId={extraCardId}
        />

        <h2>Play Area</h2>
        <PlayerPlayArea playArea={playArea.cards} score={playArea.score} onCardClick={handlePlayAreaCardClick} />

        <h2>Other Players</h2>
        <OtherPlayersContainer otherPlayers={otherPlayers} currentTurnPlayerId={currentTurnPlayerId} />
      </div>
    </PlayLayout>
  );

};

export default Play;
