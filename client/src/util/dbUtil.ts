import Card from "../model/Card";
import * as admin from 'firebase-admin';  // Use ES6 import
// const admin = require("firebase-admin");
// import admin from "firebase-admin";
const serviceAccount = require("../../../auth/southernrealms-f130b-firebase-adminsdk-8gwhx-a87375e558.json"); // Adjust path as necessary

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://southernrealms-f130b-default-rtdb.firebaseio.com/", // Your Realtime Database URL
});

// const db = admin.database();

export default class DBUtil {
  private static basePath: string = "app";
  private static dbRef: admin.database.Reference = admin.database().ref(DBUtil.basePath);

  constructor(basePath: string = "app") {
    DBUtil.basePath = basePath;
    DBUtil.dbRef = admin.database().ref(DBUtil.basePath);
  }

  private static getGamesRef() {
    return this.dbRef.child("games");
  }

  private static getDecksRef() {
    return this.dbRef.child("decks");
  }

  private static defaultGameSession = {
    players: [],            // No players initially
    gameStatus: 'waiting',  // Initial status, could be 'waiting', 'in-progress', 'completed'
    currentTurn: 0,         // Track whose turn, 0 when no turns have been made
    actions: []             // History of actions taken in the game
  };

  public static async createGameSession(): Promise<string> {
    const gamesRef = this.getGamesRef();
    const newSessionRef = gamesRef.push();
    // Set the initial game session with default values
    await newSessionRef.set(this.defaultGameSession);
    return newSessionRef.key as string;  // Assure TypeScript that the key is never null
  }
  // Method to get all games from the database
  public static async getAllGames(): Promise<any[]> {
    const gamesRef = this.getGamesRef();
    const snapshot = await gamesRef.once('value');

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No games available");
      return [];
    }
  }

  // Method to get a deck by name
  public static async getDeck(deckName: string): Promise<Card[]> {
    const deckRef = this.getDecksRef().child(deckName.replace(" ", "_"));
    const snapshot = await deckRef.once('value');

    if (snapshot.exists()) {
      const deckData = snapshot.val();
      const cards: Card[] = [];
      for (const key in deckData) {
        if (deckData.hasOwnProperty(key)) {
          const cardData = deckData[key];
          const card = new Card({
            id: cardData.unique_id,
            name: cardData.name,
            text: cardData.text,
            imgUrl: cardData.filename,
            type: cardData.type,
            points: cardData.points
          });
          cards.push(card);
        }
      }
      return cards;
    } else {
      console.log("Deck not found");
      return [];
    }
  }

  /** Additional methods for interaction with games and decks can be added here */
}
