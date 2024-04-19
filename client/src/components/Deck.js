import React from 'react';

function Deck({ onDraw }) {
  return (
      <div className="pile">
        <div onClick={onDraw} className="card card-face-down">
          Deck
        </div>
      </div>
  );
}

export default Deck;
