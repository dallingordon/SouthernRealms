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
const firebaseConfig = {
  apiKey: "AIzaSyD9f8k_JjBjvYLes8ZFFB8QgpGMv7BjvuU",
  authDomain: "southernrealms-f130b.firebaseapp.com",
  databaseURL: "https://southernrealms-f130b-default-rtdb.firebaseio.com",
  projectId: "southernrealms-f130b",
  storageBucket: "southernrealms-f130b.appspot.com",
  messagingSenderId: "983915765124",
  appId: "1:983915765124:web:3fe83f5ab50fcc0e7891d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, set };
