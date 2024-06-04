import React from 'react';
import Card from './Card';

interface HandProps {
  cards: Array<{
    id: string;
    imgUrl?: string;
    type?: string; // Add type property to determine if the card is special
    cardInputData?: string;
  }>;
  onCardClick: (id: string) => void;
  isSpecialCardSelected: boolean; // Add isSpecialCardSelected prop
}

const Hand: React.FC<HandProps> = ({ cards, onCardClick, isSpecialCardSelected }) => {
  return (
    <div style={styles.hand}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
          isSpecialCardSelected={isSpecialCardSelected} // Pass this to the Card component
        />
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
