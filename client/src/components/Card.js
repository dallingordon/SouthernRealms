import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, text, onMoveCard, source }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id, type: "card", source }, // Add 'source' to the drag item
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const imageUrl = `${process.env.PUBLIC_URL}/images/cardImages/${text}`;

  const style = {
    opacity: isDragging ? 0.5 : 1,
    backgroundImage: `url('${imageUrl}')`,
    cursor: 'move', // Change cursor to indicate move
  };

  return (
    <div ref={drag} className="card card-face-up" style={style}>
      {text}{source}
    </div>
  );
};

export default Card;
