// src/pages/CreateGame.tsx

import React from 'react';
import { db } from '../firebase/clientApp'; // Adjust the import path to your Firebase client configuration
import HomeLayout from "@/components/layout/HomeLayout";  // Assuming you might use a similar layout
import styles from "../styles/pages/CreateGame.module.css"; // Adjust path and name as needed

const CreateGame = () => {
  const handleCreateGame = async () => {
    const newGameRef = db.ref('games').push();
    await newGameRef.set({ players: [], status: 'waiting' });  // Setting initial game data
    alert('New game created with ID: ' + newGameRef.key);  // Alert or handle the ID as you see fit
  };

  return (
    <HomeLayout>  // Reusing the HomeLayout, adjust if different layout is needed
      <div className={styles.container}>
        <button onClick={handleCreateGame}>Create New Game</button>
      </div>
    </HomeLayout>
  );
};

export default CreateGame;
