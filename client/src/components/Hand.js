import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card'; // Ensure the path is correct based on your project structure

function Hand({ cards, moveCard }) {

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item) => {
      // Handle the card drop by moving it to the hand, moveCard checks and processes it appropriately
      moveCard(item.id, 'hand');
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="hand" style={{ backgroundColor: isOver ? 'lightgreen' : 'transparent' }}>
      {cards.map((card) => (
        // Ensure each Card is draggable and can handle moving based on the game's logic
        <Card key={card.id} id={card.id} text={card.text} source="hand" onMoveCard={moveCard} />
      ))}
    </div>
  );
}

export default Hand;
