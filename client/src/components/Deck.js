import React from 'react';

function Deck({ onDraw }) {
  return (
    <div onClick={onDraw} className="deck card">
      Deck
    </div>
  );
}

export default Deck;
