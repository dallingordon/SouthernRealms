import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, cardid, text, source, isDeactivated }) => {

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
    cursor: 'move',
    transform: isDeactivated ? 'rotate(90deg)' : 'none'
  };

  return (

    <div ref={drag} id={id} className="card card-face-up " style={style} >
      {isDeactivated}
    </div>
  );
};

export default Card;
