import React from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import HomeLayout from "@/components/layout/HomeLayout";
import "../util/firebaseClient"

const CreateGame: React.FC = () => {
  const handleCreateGame = async () => {
    const functions = getFunctions(); // Get a reference to the Firebase Functions service
    const createGame = httpsCallable(functions, 'createGame');

    try {
      const result = await createGame(); // Call the createGame function
      alert('New game created with ID: ' + result.data.sessionId );
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Failed to create game.');
    }
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
