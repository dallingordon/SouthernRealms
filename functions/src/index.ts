// on the terminal: firebase deploy --only functions
import * as functions from 'firebase-functions';
//import * as cors from 'cors';
import * as admin from 'firebase-admin';
// effects:
import { ClonerEffect } from './util/ClonerEffect';
import { TurretEffect } from './util/TurretEffect';
import { TeleporterEffect} from "./util/TeleporterEffect";
//const corsHandler = cors({origin: true});
// special effects:
const { UCFEffects } = require('./util/UCFEffects');
const { BLOODEffects } = require('./util/BLOODEffects');

admin.initializeApp();

interface Card {
  id: string;
  name: string;
  type: string;
  points: number;
}

interface Player {
  userId: string;
  deckId: string;
  score: number;
  drawId: number;
  drawPile: Record<string, Card>;
  hand: Record<string, Card>;
  playArea: Record<string, {
    previousCardId?: string;
    nextCardId?: string;
  }>;
  discardPile: Record<string, Card>;
  firstPlayedCardId?: string;
  lastPlayedCardId?: string;
  joinedAt: any; // You might want to specify the exact type for timestamp
}



exports.createGame = functions.https.onCall((data, context) => {
  const newGame: { sessionId: null; currentTurnPlayerId: number; isGameActive: boolean } = {
    sessionId: null,
    currentTurnPlayerId: 0,
    isGameActive: false
  };

  return admin.database().ref('app/games').push(newGame)
    .then(snapshot => {
      // After pushing to the database, update the sessionId with the key generated by Firebase
      return admin.database().ref(`app/games/${snapshot.key}`).update({ sessionId: snapshot.key })
        .then(() => {
          return { sessionId: snapshot.key };
        });
    })
    .catch(error => {
      console.error('Error creating game:', error);
      throw new functions.https.HttpsError('unknown', 'Failed to create game', error);
    });
});

exports.joinGame = functions.https.onCall((data, context) => {
  const { userId, deckId, gameId } = data;

  if (!userId || !deckId || !gameId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'required arguments: userId, deckId, and gameId.');
  }

  const playerData: { score: number; drawPile: {}; playArea: {}; discardPile: {}; deckId: any; joinedAt: Object; drawId: number; userId: any; hand: {} } = {
    userId,
    deckId,
    score: 0,
    drawId: 0, // Initialize drawId
    drawPile: {},
    hand: {},
    playArea: {},
    discardPile: {},
    joinedAt: admin.database.ServerValue.TIMESTAMP
  };

  const playersRef = admin.database().ref(`app/games/${gameId}/players`);

  return playersRef.push(playerData)
    .then((newPlayerRef) => {
      return { gameId, playerId: newPlayerRef.key }; // Return the new player key
    })
    .catch(error => {
      console.error('Error joining game:', error);
      throw new functions.https.HttpsError('unknown', 'Failed to join game', error);
    });
});


exports.recordMove = functions.https.onCall(async (data, context) => {
  const { gameSessionId, playerId, cardId } = data;

  if (!gameSessionId || !playerId || !cardId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required parameters');
  }

  const gameSessionRef = admin.database().ref(`app/games/${gameSessionId}`);
  const movesRef = admin.database().ref(`app/games/${gameSessionId}/moves`);
  const playersRef = admin.database().ref(`app/games/${gameSessionId}/players/${playerId}`);
  const newMoveRef = movesRef.push();

  const newMoveId = newMoveRef.key;

  const gameSessionSnapshot = await gameSessionRef.once('value');
  const gameSession = gameSessionSnapshot.val();

  const playerSnapshot = await playersRef.once('value');
  const player = playerSnapshot.val();

  let updates: any = {};
  const previousMoveId = gameSession.latestMoveId; // Add this line

  const newMoveData: any = {
    playerId,
    cardId,
    timestamp: admin.database.ServerValue.TIMESTAMP,
    nextMoveId: null
  };

  if (previousMoveId) {
    newMoveData.previousMoveId = previousMoveId; // Add previousMoveId only if it exists
  }

  updates[`moves/${newMoveId}`] = newMoveData;

  if (!gameSession.firstMoveId) {
    updates['firstMoveId'] = newMoveId;
  }

  if (gameSession.latestMoveId) {
    updates[`moves/${gameSession.latestMoveId}/nextMoveId`] = newMoveId;
  }

  updates['latestMoveId'] = newMoveId;

  if (!player.playArea) {
    player.playArea = {};
  }

  let playedCard = null;
  if (player.hand && player.hand[cardId]) {
    playedCard = player.hand[cardId];
    updates[`players/${playerId}/hand/${cardId}`] = null;
  }

  if (playedCard) {
    updates[`players/${playerId}/playArea/${cardId}`] = playedCard;
  }

  updates[`players/${playerId}/playArea/${cardId}`] = {
    ...playedCard,
    previousCardId: player.lastPlayedCardId || null,
    nextCardId: null
  };

  if (!player.firstPlayedCardId) {
    updates[`players/${playerId}/firstPlayedCardId`] = cardId;
  }

  if (player.lastPlayedCardId && player.hand[cardId].name != "Teleporter") { //added this since teleporter pulls this card up
    updates[`players/${playerId}/playArea/${player.lastPlayedCardId}/nextCardId`] = cardId;
  }

  updates[`players/${playerId}/lastPlayedCardId`] = cardId;

  function calculateScore(gameSession: any, playerId: string): number {
    const player = gameSession.players[playerId];
    let totalScore = 0;
    console.log("calculating score playerid",playerId);
    Object.values(player.playArea as Record<string, any>).forEach((card: any) => {
      let currentPoints = card.points;

      if (card.deactivated) {
          currentPoints = 0;
      } else if (card.appliedEffects) {
            const effects = Object.values(card.appliedEffects);
            effects.forEach((effect: any) => {
                if (effect.action === "multiply") {
                    currentPoints *= effect.value;
                } else if (effect.action === "add") {
                    currentPoints += effect.value;
                } else if (effect.action === "subtract") {
                    currentPoints -= effect.value;
                }
            });
        }

        totalScore += currentPoints;
    });

    return totalScore;
  }


  // Apply card effects and update scores

  let scoreUpdates: Set<string> = new Set<string>();

  if (playedCard) {
  // Check if the card type is 'Special'
  if (playedCard.type === 'Special') {
    const playerDeck = player.deckId; // Assuming playerRef has deckId to identify the deck
    let specialEffect;

    // Determine which deck's effects file to use
    if (playerDeck === 'UCF') {
      // Select the appropriate class based on the card name
      if (UCFEffects[playedCard.name]) {
        specialEffect = new UCFEffects[playedCard.name]();
      }
    } else if (playerDeck === 'Blood') {
      // Select the appropriate class based on the card name
      if (BLOODEffects[playedCard.name]) {
        specialEffect = new BLOODEffects[playedCard.name]();
      }
    }

    if (specialEffect) {
      // Apply the special effect
      const { updates: specialUpdates, userIdsToUpdate } = await specialEffect.applyEffect(gameSession, playerId, cardId);
      updates = { ...updates, ...specialUpdates };
      userIdsToUpdate.forEach((userId: string) => scoreUpdates.add(userId));
    } else {
      // If no special effect is found, add playerId to scoreUpdates
      scoreUpdates.add(playerId);
    }
  } else if (playedCard.name === 'Cloner') {
      const clonerEffect = new ClonerEffect();
      const { updates: clonerUpdates, userIdsToUpdate } = await clonerEffect.applyEffect(gameSession, playerId, cardId);
      updates = { ...updates, ...clonerUpdates };
      userIdsToUpdate.forEach(userId => scoreUpdates.add(userId));
    } else if (playedCard.name === 'Turret') {
      const turretEffect = new TurretEffect();
      const { updates: turretUpdates, userIdsToUpdate } = await turretEffect.applyEffect(gameSession, playerId, cardId);
      updates = { ...updates, ...turretUpdates };
      userIdsToUpdate.forEach(userId => scoreUpdates.add(userId));
    } else if (playedCard.name === 'Teleporter') {
      const teleporterEffect = new TeleporterEffect();
      const { updates: teleporterUpdates, userIdsToUpdate } = await teleporterEffect.applyEffect(gameSession, playerId, cardId);
      updates = { ...updates, ...teleporterUpdates };
      userIdsToUpdate.forEach(userId => scoreUpdates.add(userId));
    } else {
      scoreUpdates.add(playerId);
    }
  }

  // Update the game session with the gathered updates
  await gameSessionRef.update(updates);

  // Refresh the game session state after updates
  const updatedGameSessionSnapshot = await gameSessionRef.once('value');
  const updatedGameSession = updatedGameSessionSnapshot.val();

  // Calculate and update scores based on the updated game session state
  updates = {};
  scoreUpdates.forEach(userId => {
    if (updatedGameSession.players[userId]) {
      updatedGameSession.players[userId].score = calculateScore(updatedGameSession, userId);
    }
    updates[`players/${userId}/score`] = calculateScore(updatedGameSession, userId);
  });

  // Update the game session with the recalculated scores
  await gameSessionRef.update(updates);

  return { success: true };



});







exports.shuffle = functions.https.onCall(async (data, context) => {
  const { gameSessionId } = data;

  if (!gameSessionId) {
    console.error("Game session ID is missing.");
    throw new functions.https.HttpsError("invalid-argument", "Game session ID is required.");
  }

  const db = admin.database();
  const gameSessionRef = db.ref(`app/games/${gameSessionId}`);
  const playersRef = gameSessionRef.child("players");

  try {
    const playersSnapshot = await playersRef.once("value");
    const players: Record<string, Player> = playersSnapshot.val();

    if (!players) {
      console.error(`No players found in game session ${gameSessionId}.`);
      throw new functions.https.HttpsError("not-found", "No players found in the game session.");
    }

    const updates: Record<string, any> = {};

    for (const playerId in players) {
      const player = players[playerId];
      const deckId = player.deckId;
      if (!deckId) {
        console.error(`Player ${playerId} does not have a deck assigned.`);
        throw new functions.https.HttpsError("failed-precondition", `Player ${playerId} does not have a deck assigned.`);
      }

      // Fetch the deck
      const deckSnapshot = await db.ref(`app/decks/${deckId}`).once("value");
      const deckData = deckSnapshot.val();

      if (!deckData) {
        console.error(`Deck ${deckId} not found or has no cards.`);
        throw new functions.https.HttpsError("not-found", `Deck ${deckId} not found or has no cards.`);
      }

      console.log(`Deck ${deckId} found with ${Object.keys(deckData).length} cards.`);

      // Convert deckData to an array of cards
      const cards = Object.keys(deckData).map(cardId => ({ id: cardId, ...deckData[cardId] }));

      // Shuffle the cards
      const shuffledCards = shuffleArray(cards);

      // Create a linked list order
      const drawPile: Record<string, Card> = {};
        shuffledCards.forEach((card, index) => {
          drawPile[index.toString()] = card;
        });

// Set drawId to 0
  updates[`/app/games/${gameSessionId}/players/${playerId}/drawId`] = 0;
  updates[`/app/games/${gameSessionId}/players/${playerId}/drawPile`] = drawPile;

    }

    // Apply the updates to the database
    await db.ref().update(updates);

    return { success: true, message: "Players' decks shuffled and draw piles updated." };
  } catch (error) {
    console.error("Error shuffling decks and updating draw piles:", error);
    throw new functions.https.HttpsError("internal", "Failed to shuffle decks and update draw piles.", error);
  }
});

function shuffleArray(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// this signature right here lets you call this function from the deck effect classes.
export const drawCardFunction = async (data: { gameSessionId: string, playerId: string, numberOfCards: number }) => {
  const { gameSessionId, playerId, numberOfCards } = data;

  if (!gameSessionId || !playerId || !numberOfCards) {
    console.error("Game session ID, player ID, or number of cards is missing.");
    throw new functions.https.HttpsError("invalid-argument", "Game session ID, player ID, and number of cards are required.");
  }

  const db = admin.database();
  const playerRef = db.ref(`app/games/${gameSessionId}/players/${playerId}`);

  try {
    const playerSnapshot = await playerRef.once("value");
    const player = playerSnapshot.val();

    if (!player) {
      console.error(`Player ${playerId} not found in game session ${gameSessionId}.`);
      throw new functions.https.HttpsError("not-found", "Player not found in the game session.");
    }

    let drawId = player.drawId;
    const drawPile = player.drawPile;
    const hand = player.hand || {};
    const drawnCards = [];

    for (let i = 0; i < numberOfCards; i++) {
      if (drawPile && drawPile[drawId.toString()]) {
        const cardToDraw = drawPile[drawId.toString()];

        // Add card to the player's hand using the card's unique id
        hand[cardToDraw.id] = cardToDraw;
        drawnCards.push(cardToDraw);

        // Remove card from drawPile
        delete drawPile[drawId.toString()];

        // Increment drawId
        drawId += 1;
      } else {
        console.error(`No card found at drawId ${drawId} for player ${playerId}.`);
        throw new functions.https.HttpsError("failed-precondition", "No card to draw.");
      }
    }

    // Update player data in Firebase
    await playerRef.update({
      hand,
      drawPile,
      drawId,
    });

    return { success: true, message: `${numberOfCards} cards drawn successfully.`, cards: drawnCards };
  } catch (error) {
    console.error("Error drawing cards:", error);
    throw new functions.https.HttpsError("internal", "Failed to draw cards.", error);
  }
}

exports.drawCard = functions.https.onCall(drawCardFunction);

