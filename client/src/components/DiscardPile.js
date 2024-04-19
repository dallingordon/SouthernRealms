import React from 'react';
import { useDrop } from 'react-dnd';

function DiscardPile({ cards, onDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',  // This should match the type you set in useDrag
    drop: (item) => onDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ width: '100px', height: '140px', backgroundColor: 'lightgray', border: isOver ? '3px solid green' : '2px dashed black', textAlign: 'center', position: 'relative' }}>
      {cards.length > 0 && cards.map((card, index) => (
        <div key={index} className="card" style={{ backgroundColor: 'transparent', position: 'absolute', top: 0 }}>Card</div>
      ))}
      {cards.length === 0 && 'Discard Pile'}
    </div>
  );
}

export default DiscardPile;
