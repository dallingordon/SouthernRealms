import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

function DiscardPile({ cards, moveCard }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item) => {
      moveCard(item.id, item.source, 'discard');
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.15)' : 'transparent',
    position: 'relative', // Ensure stacking context
    width: '100px', // Adjust width to fit one card
    height: '140px', // Adjust height to fit one card
    overflow: 'hidden', // Prevent cards from overflowing the boundary
    border: '2px dashed black'
  };

  return (
    <div class="pile">
      <div ref={drop} className="discard-pile" style={style}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={card.id} className="card-in-discard" style={{ zIndex: cards.length - index }}>
              <Card id={card.id} cardid={card.cardid} text={card.text} isDeactivated={false}  />
            </div>
          ))
        ) : (
          <div className="empty-discard">No Cards</div>
        )}
      </div>
    </div>
  );
}

export default DiscardPile;
