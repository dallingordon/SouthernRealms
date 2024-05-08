import Card from "../model/Card";

const admin = require("firebase-admin");
const serviceAccount = require("../../../auth/southernrealms-f130b-firebase-adminsdk-8gwhx-a87375e558.json"); // Adjust path as necessary

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://southernrealms-f130b-default-rtdb.firebaseio.com/", // Your Realtime Database URL
});

const db = admin.database();

export default class DBUtil {
  public dbRef;

  constructor(basePath: string) {
    this.dbRef = db.ref(basePath);
  }

    // Method to get all games from the database
  public async getAllGames(): Promise<any[]> {
    const snapshot = await this.dbRef.once('value');

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No games available");
      return [];
    }
  }
  /**  make call to DB to get a deck by ID */
  public async getDeck(deckName: string): Promise<Card[]> {
    const deckRef = this.dbRef.child(deckName.replace(" ", "_"));

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

  /** Gamesession interaction */

  /** User auth */
}
