import React from 'react';

interface PlayerPlayAreaProps {
  playArea: Array<{
    id: string;
    // Add any other properties you expect in the card object
  }>;
}

const PlayerPlayArea: React.FC<PlayerPlayAreaProps> = ({ playArea }) => {
  return (
    <div style={styles.playArea}>
      {playArea.map(card => (
        <div key={card.id} style={styles.card}>
          <p>{card.id}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
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
  card: {
    width: '100px',
    height: '150px',
    backgroundColor: 'green',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '5px',
  } as React.CSSProperties,
};

export default PlayerPlayArea;
