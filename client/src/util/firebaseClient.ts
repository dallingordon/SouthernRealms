// src/firebase/firebaseClient.ts

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

// Firebase configuration with TypeScript interface for type checking
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // Optional: only needed if using Firebase Analytics
}

// Your web app's Firebase configuration
//put the auth here.  don't put it on github doofus
// revoked it.

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, set };
