import { initializeApp } from 'firebase/app';
import {getDatabase, ref, get,set, update, push, onValue, serverTimestamp} from 'firebase/database'; // Import for Realtime Database

import firebaseConfig from '../../../auth/clientConfig'; // Adjust the path as necessary

const app = initializeApp(firebaseConfig);
const realtimeDb = getDatabase(app); // Reference to Realtime Database

// Function to fetch decks (Realtime Database)
const getDecks = async () => {
  const decksRef = ref(realtimeDb, 'app/decks'); // Reference to the "decks" node

  // Get data once for testing
  const snapshot = await get(decksRef);
  const decks = snapshot.val() || []; // Get data or set to empty array


  return Object.keys(decks); // Map data to desired format
};


// Function to fetch active games (Realtime Database)
const getActiveGames = async () => {
  const gamesRef = ref(realtimeDb, 'app/games'); // Reference to the "games" node

  // Get data once for testing
  const snapshot = await get(gamesRef);
  const games = snapshot.val() || []; // Get data or set to empty array

  return Object.keys(games); // Map data to desired format
};

const getPlayerData = async (gameSessionId, playerId) => {
  const playerRef = ref(realtimeDb, `app/games/${gameSessionId}/players/${playerId}`);
  const snapshot = await get(playerRef);
  if (snapshot.exists()) {
    return snapshot.val().deckId;
  } else {
    throw new Error('Player data not found');
  }
};


const startGame = async (gameSessionId) => {
  const playersRef = ref(realtimeDb, `app/games/${gameSessionId}/players`);
  const snapshot = await get(playersRef);

  if (!snapshot.exists()) {
    throw new Error('No players found for this game session');
  }

  const players = snapshot.val();
  const playerIds = Object.keys(players);
  const playerCount = playerIds.length;

  if (playerCount < 2) {
    throw new Error('Not enough players to start the game');
  }

  // Create the turn order
  const shuffledPlayerIds = playerIds.sort(() => 0.5 - Math.random()); // Shuffle the player IDs
  const nextPlayerList = [...shuffledPlayerIds, shuffledPlayerIds[0]]; // Create a circular list
  console.log(nextPlayerList);
  // Select the starting player
  const currentTurnPlayerId = shuffledPlayerIds[0];

  // Create updates object
  const updates = {};
  updates[`app/games/${gameSessionId}/currentTurnPlayerId`] = currentTurnPlayerId;
  updates[`app/games/${gameSessionId}/isGameActive`] = true;

  shuffledPlayerIds.forEach((playerId, index) => {
    const nextPlayerId = nextPlayerList[index + 1];
    updates[`app/games/${gameSessionId}/players/${playerId}/nextPlayer`] = nextPlayerId;
  });

  await update(ref(realtimeDb), updates);
};

const subscribeToGameSession = (gameSessionId, callback) => {
  const gameSessionRef = ref(realtimeDb, `app/games/${gameSessionId}`);
  onValue(gameSessionRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
};
// Function to update the current turn player
const updateCurrentTurnPlayer = async (gameSessionId, currentPlayerId) => {
  const currentPlayerRef = ref(realtimeDb, `app/games/${gameSessionId}/players/${currentPlayerId}`);
  const snapshot = await get(currentPlayerRef);
  if (!snapshot.exists()) {
    throw new Error('Current player data not found');
  }

  const currentPlayerData = snapshot.val();
  const nextPlayerId = currentPlayerData.nextPlayer;
  if (!nextPlayerId) {
    throw new Error('Next player data not found');
  }

  await update(ref(realtimeDb, `app/games/${gameSessionId}`), {
    currentTurnPlayerId: nextPlayerId,
  });
};

export { app, getDecks, getActiveGames, getPlayerData, startGame, subscribeToGameSession, updateCurrentTurnPlayer };
