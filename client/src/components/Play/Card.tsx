import React from 'react';
import { getImageUrl } from '../../util/firebaseClient';

interface CardProps {
  card: {
    id: string;
    imgUrl?: string;
    deactivated?: boolean;
    type?: string; // Add type property to determine if the card is special
    cardInputData?: string;
  };
  onClick?: (id: string) => void;
  isSpecialCardSelected?: boolean; // Add isSpecialCardSelected prop
}

const Card: React.FC<CardProps> = ({ card, onClick, isSpecialCardSelected }) => {
  const handleClick = () => {
    if (onClick) {
      if (isSpecialCardSelected && card.type !== 'Special') {
        onClick(card.id);
      } else if (!isSpecialCardSelected) {
        onClick(card.id);
      }
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        transform: card.deactivated ? 'rotate(90deg)' : 'none', // Apply rotation if deactivated
        cursor: isSpecialCardSelected && card.type !== 'Special' ? 'pointer' : 'default' // Only show pointer cursor for clickable cards
      }}
      onClick={handleClick}
    >
      {card.imgUrl ? (
        <img src={card.imgUrl} alt={`Card ${card.id}`} style={styles.image} />
      ) : (
        <p>{card.id}</p>
      )}
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
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out' // Add transition for smooth rotation
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover'
  } as React.CSSProperties,
};

export default Card;
