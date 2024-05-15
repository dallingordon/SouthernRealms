import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get} from 'firebase/database'; // Import for Realtime Database

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

export { app, getDecks, getActiveGames };
