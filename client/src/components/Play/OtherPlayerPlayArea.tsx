import React from 'react';

interface OtherPlayerPlayAreaProps {
  playArea: Array<string>; // Array of card IDs
}

const OtherPlayerPlayArea: React.FC<OtherPlayerPlayAreaProps> = ({ playArea }) => {
  return (
    <div style={styles.playArea}>
      {playArea.map(cardId => (
        <div key={cardId} style={styles.card}>
          <p>{cardId}</p>
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
    padding: '5px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
  } as React.CSSProperties,
  card: {
    width: '50px',
    height: '75px',
    backgroundColor: 'green',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '3px',
  } as React.CSSProperties,
};

export default OtherPlayerPlayArea;
