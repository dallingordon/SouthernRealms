import React from 'react';

function PlayArea({ children }) {
  return (
    <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed blue' }}>
      {children}
    </div>
  );
}

export default PlayArea;
