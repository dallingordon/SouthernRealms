import React from 'react';
import OtherPlayerPlayArea from './OtherPlayerPlayArea';

interface OtherPlayersContainerProps {
  otherPlayers: Array<{
    id: string;
    deckId: string;
    playArea: Array<{
      id: string;
      imgUrl?: string;
    }>;
  }>;
  currentTurnPlayerId: string;
}

const OtherPlayersContainer: React.FC<OtherPlayersContainerProps> = ({ otherPlayers, currentTurnPlayerId }) => {
  return (
    <div style={styles.container}>
      {otherPlayers.map(player => (
        <div key={player.id} style={styles.playerContainer}>
          <h3 style={{ color: currentTurnPlayerId === player.id ? 'lightgreen' : 'black' }}>
            {player.deckId}
          </h3>
          <OtherPlayerPlayArea playArea={player.playArea} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,
  playerContainer: {
    margin: '10px 0',
  } as React.CSSProperties,
};

export default OtherPlayersContainer;
