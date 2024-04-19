import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card'; // Ensure this path is correct based on your project structure

function PlayArea({ cards, setCards }) {
  const handleCardMove = (draggedId, hoverId) => {
    const draggedIndex = cards.findIndex(card => card.id === draggedId);
    const hoverIndex = cards.findIndex(card => card.id === hoverId);
    let newCards = [...cards];
    let temp = newCards[draggedIndex];
    newCards[draggedIndex] = newCards[hoverIndex];
    newCards[hoverIndex] = temp;
    setCards(newCards);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        // Add the card to the current cards in play area
        console.log(setCards)
        setCards(prevCards => [...prevCards, item]);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="play-area">
      {cards.map((card, index) => (
        <Card key={card.id} id={card.id} text={card.text} onMoveCard={handleCardMove} />
      ))}
    </div>
  );
}

export default PlayArea;
