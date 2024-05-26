import React from 'react';
import Card from './Card';

interface HandProps {
  cards: Array<{
    id: string;
    imgUrl?: string; // Add imgUrl property
    // Add any other properties you expect in the card object
  }>;
  onCardClick: (id: string) => void; // Add onCardClick prop
}

const Hand: React.FC<HandProps> = ({ cards, onCardClick }) => {
  return (
    <div style={styles.hand}>
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

const styles = {
  hand: {
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

export default Hand;
