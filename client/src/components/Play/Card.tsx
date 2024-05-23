import React from 'react';

interface CardProps {
  card: {
    id: string;
    // Add any other properties you expect in the card object
  };
  onClick?: (id: string) => void; // Add onClick prop
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <p>{card.id}</p>
    </div>
  );
};

const styles = {
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
    cursor: 'pointer' // Add cursor style to indicate clickable
  } as React.CSSProperties,
};

export default Card;
