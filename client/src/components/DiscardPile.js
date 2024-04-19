import React from 'react';
import { useDrop } from 'react-dnd';

function DiscardPile({ cards, onDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item) => onDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Define the style conditionally based on isOver
  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.15)' : 'transparent', // Darkens background when a card is over the pile
    padding: '10px', // Ensures padding around the cards
    width: '100%', // Ensures the drop area is visually defined
    height: '140px', // Consistent height
    display: 'flex', // Allows card layout within the pile
    justifyContent: 'center', // Center cards horizontally
    alignItems: 'center', // Center cards vertically
    border: '2px dashed black', // Styling for the discard pile border
  };

  return (
    <div ref={drop} className="pile" style={style}>
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <div key={index} className="card card-face-down">
            {/* Optionally, you can display text or nothing */}
          </div>
        ))
      ) : (
        <div className="empty-discard">X</div>
      )}
    </div>
  );
}

export default DiscardPile;
