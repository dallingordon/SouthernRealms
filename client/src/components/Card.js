// Card.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ id, text, onMoveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    hover: (item, monitor) => {
      if (item.id !== id) {
        onMoveCard(item.id, id);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={(node) => drag(drop(node))} className="card card-face-up" style={style}>
      {text}
    </div>
  );
};

export default Card;
