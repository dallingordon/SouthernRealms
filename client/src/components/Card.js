import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, cardid, text, onMoveCard, source }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id, type: "card", source }, // Use 'id' for dragging and drop identification
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const imageUrl = `${process.env.PUBLIC_URL}/images/cardImages/${text}`;

  const style = {
    opacity: isDragging ? 0.5 : 1,
    backgroundImage: `url('${imageUrl}')`,
    cursor: 'move'
  };

  return (
    <div ref={drag} className="card card-face-up" style={style}>

    </div>
  );
};

export default Card;
