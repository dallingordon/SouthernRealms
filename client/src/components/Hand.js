import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100px',
        height: '140px',
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {text}
    </div>
  );
};

function Hand({ cards }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cards.map((card, index) => (
        <Card key={card} id={card} text={card} />
      ))}
    </div>
  );
}

export default Hand;
