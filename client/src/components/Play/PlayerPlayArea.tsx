import React from 'react';
import Card from './Card'; // Ensure the correct path to the Card component

interface PlayerPlayAreaProps {
  playArea: Array<{
    id: string;
    imgUrl?: string;
    deactivated?: boolean; // Add deactivated property
    cardInputData?: string;
  }>;
  score: number;
}

const PlayerPlayArea: React.FC<PlayerPlayAreaProps> = ({ playArea, score }) => {
  return (
    <div style={styles.playAreaContainer}>
      <p style={styles.score}>Score: {score}</p>
      <div style={styles.playArea}>
        {playArea.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  playAreaContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,
  score: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  } as React.CSSProperties,
  playArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  } as React.CSSProperties,
};

export default PlayerPlayArea;
