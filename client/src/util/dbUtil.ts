import Card from "@/model/Card";

const admin = require("firebase-admin");
const serviceAccount = require("./path/to/service-account-file.json"); // Adjust path as necessary

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

  /**  make call to DB to get a deck by ID */
  public static getDeck(id: string): Array<Card> {
    return [];
  }

  /** Gamesession interaction */

  /** User auth */
}
