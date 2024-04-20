import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card'; // Ensure the Card component is imported

function PlayArea({ cards, moveCard }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item) => {
      moveCard(item.id, 'playArea'); // Move card to play area when dropped
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const style = {
    backgroundColor: isOver ? 'rgba(100, 100, 255, 0.5)' : 'transparent', // Custom style for Play Area
    padding: '10px', // Padding around the cards
    width: '100%', // Full width to contain multiple cards
    minHeight: '140px', // Minimum height to maintain area visibility
    display: 'flex', // Flex display to arrange cards horizontally or vertically based on your design
    flexWrap: 'wrap', // Wrap cards if they do not fit in a single row
    justifyContent: 'start', // Align cards to the start of the play area
    alignItems: 'start', // Align items to the start vertically
    border: '2px dashed blue', // Styling for the play area border
  };

  return (
    <div ref={drop} className="playArea" style={style}>
      {cards.map(card => (
        <Card key={card.id} id={card.id} text={card.text} source="playArea" onMoveCard={moveCard} />
      ))}
    </div>
  );
}

export default PlayArea;
