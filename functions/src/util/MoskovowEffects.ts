import { CardEffect } from './CardEffect';

export class SaintEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[] }> {
    const updates: any = {};
    const secondUpdates: any = {};
    const userIdsToUpdate: string[] = [playerId];

    // Add the Saint card to the persistEffects
    if (!gameState.persistEffects) {
      gameState.persistEffects = [];
    }

    gameState.persistEffects.push({
      playerId,
      deckId: gameState.players[playerId].deckId,
      cardId: cardId,
      persistFunction: 'SaintPersist'
    });

    updates[`persistEffects`] = gameState.persistEffects;

    return { updates, secondUpdates, userIdsToUpdate };
  }
}

export class SaintPersistEffect {
  async applyEffect(gameState: any, persistPlayerId: string, persistDeckId: string, persistCardId: string, playerId: string, cardId: string, key: string): Promise<any> {
    const updates: any = {};

      const saintCardPath = `players/${persistPlayerId}/playArea/${persistCardId}`;
      updates[`${saintCardPath}/immune`] = true;
      updates[`${saintCardPath}/deactivated`] = false;
      updates[`${saintCardPath}/appliedEffects`] = null;




    return updates;
  }
}

// Export an object containing all the effect classes
export const MOSKOVOWEffects = {

  'Rus 1': SaintEffect,
  'Rus 2': SaintEffect,
  'SaintPersist': SaintPersistEffect,

  // Add more card names and their corresponding classes here
};
