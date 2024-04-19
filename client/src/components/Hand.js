import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card'; // Ensure the path is correct based on your project structure

function Hand({ cards, setCards }) {
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        // Optionally handle card removal or other interactions
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="hand" style={{ backgroundColor: isOver ? 'lightgreen' : 'transparent' }}>
      {cards.map((card, index) => (
        <Card key={index} id={card.id} text={card.text} />
      ))}
    </div>
  );
}

export default Hand;
