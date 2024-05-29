import React from 'react';

interface OtherPlayerPlayAreaProps {
  playArea: Array<{
    id: string;
    imgUrl?: string;
    deactivated?: boolean;
  }>;
  score: number;
}

const OtherPlayerPlayArea: React.FC<OtherPlayerPlayAreaProps> = ({ playArea, score }) => {
  return (
    <div style={styles.playAreaContainer}>
      <p style={styles.score}>Score: {score}</p>
      <div style={styles.playArea}>
        {playArea.map(card => (
          <div
            key={card.id}
            style={{
              ...styles.card,
              transform: card.deactivated ? 'rotate(90deg)' : 'none', // Apply rotation if deactivated
              transition: 'transform 0.3s ease-in-out', // Smooth transition
            }}
          >
            {card.imgUrl ? (
              <img src={card.imgUrl} alt={`Card ${card.id}`} style={styles.image} />
            ) : (
              <p>{card.id}</p>
            )}
          </div>
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
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  } as React.CSSProperties,
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    objectFit: 'cover',
  } as React.CSSProperties,
};

export default OtherPlayerPlayArea;
