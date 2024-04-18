import React from 'react';

function DiscardPile({ cards }) {
  return (
    <div className="discard" style={{ width: '100px', height: '140px' }}>
      {cards.length > 0 ? cards.map((card, index) => (
        <div key={index} className="card" style={{ backgroundColor: 'transparent' }}>Card</div>
      )) : 'Discard Pile'}
    </div>
  );
}


export default DiscardPile;
