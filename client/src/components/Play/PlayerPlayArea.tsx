import React from 'react';
import Card from './Card'; // Ensure the correct path to the Card component

interface PlayerPlayAreaProps {
  playArea: Array<{
    id: string;
    imgUrl?: string;
    deactivated?: boolean;
    cardInputData?: string;
    stack?: string; // Ensure the stack property is defined
  }>;
  score: number;
  selectedPlayAreaCardId?: string;
  onCardClick: (id: string) => void;
}

const preprocessPlayArea = (playArea: PlayerPlayAreaProps['playArea']) => {
  const baseCards: PlayerPlayAreaProps['playArea'] = [];
  const stackedCardsMap: { [key: string]: PlayerPlayAreaProps['playArea'] } = {};
  const referencedCards: { [key: string]: string } = {};

  // First pass: collect all cards that are referenced by the stack property
  playArea.forEach(card => {
    if (card.stack) {
      referencedCards[card.id] = card.stack;
    }
  });

  // Second pass: distribute cards into baseCards and stackedCardsMap
  playArea.forEach(card => {
    if (!Object.values(referencedCards).includes(card.id)) {
      console.log()
      baseCards.push(card);
    }

    // If the card has a stack property, add it to the stack of the referenced card
    if (card.stack) {
      if (!stackedCardsMap[card.stack]) {
        stackedCardsMap[card.stack] = [];
      }
      // Add the current card to the stack of the card it references
      stackedCardsMap[card.stack].push(card);
    }
  });

  console.log('Base Cards:', baseCards);
  console.log('Stacked Cards Map:', stackedCardsMap);

  return { baseCards, stackedCardsMap };
};






const PlayerPlayArea: React.FC<PlayerPlayAreaProps> = ({ playArea, score, selectedPlayAreaCardId, onCardClick }) => {
  const { baseCards, stackedCardsMap } = preprocessPlayArea(playArea);

  return (
    <div style={styles.playAreaContainer}>
      <p style={styles.score}>Score: {score}</p>
      <div style={styles.playArea}>
        {baseCards.map(card => (
          <div key={card.id} style={styles.cardStackContainer}>
            <Card
              card={card}
              onClick={() => onCardClick(card.id)}
              isPlayAreaSelected={selectedPlayAreaCardId === card.id}
            />
            {stackedCardsMap[card.id] && stackedCardsMap[card.id].map((stackedCard, index) => (
              <div key={stackedCard.id} style={{ ...styles.stackedCard }}>
                <Card
                  card={stackedCard}
                  onClick={() => onCardClick(stackedCard.id)}
                  isPlayAreaSelected={selectedPlayAreaCardId === stackedCard.id}
                />
              </div>
            ))}
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
  cardStackContainer: {
    position: 'relative',
    marginRight: '10px', // Adjust spacing as needed
  } as React.CSSProperties,
  stackedCard: {
    position: 'absolute',
    top: '50px',
    cursor: 'pointer', // Ensure the stacked card is clickable
  } as React.CSSProperties,
};

export default PlayerPlayArea;
