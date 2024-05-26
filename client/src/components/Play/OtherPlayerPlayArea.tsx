import React from 'react';

interface OtherPlayerPlayAreaProps {
  playArea: Array<{
    id: string;
    imgUrl?: string;
  }>;
}

const OtherPlayerPlayArea: React.FC<OtherPlayerPlayAreaProps> = ({ playArea }) => {
  return (
    <div style={styles.playArea}>
      {playArea.map(card => (
        <div key={card.id} style={styles.card}>
          {card.imgUrl ? (
            <img src={card.imgUrl} alt={`Card ${card.id}`} style={styles.image} />
          ) : (
            <p>{card.id}</p>
          )}
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    objectFit: 'cover', // Ensure the image fits within the card boundaries
  } as React.CSSProperties,
};

export default OtherPlayerPlayArea;
