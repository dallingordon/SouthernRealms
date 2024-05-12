// src/pages/CreateGame.tsx
import React from 'react';
import { db, ref, push, set } from '../util/firebaseClient';  // Adjust path as necessary
import HomeLayout from "@/components/layout/HomeLayout";
// import styles from "../styles/pages/CreateGame.module.css";

const CreateGame: React.FC = () => {
  const handleCreateGame = async () => {
    const gamesRef = ref(db, 'app/games');
    const newGameRef = push(gamesRef);
    await set(newGameRef, { players: [], status: 'waiting' });
    alert('New game created with ID: ' + newGameRef.key);
  };

  return (
    <HomeLayout>
      <div className="butt">
        <button onClick={handleCreateGame}>Create New Game</button>
      </div>
    </HomeLayout>
  );
};

export default CreateGame;
