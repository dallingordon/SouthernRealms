import { CardEffect, deactivateCard } from './CardEffect';

export class GunBoyEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[] }> {
    const updates: any = {};
    const secondUpdates: any = {};
    const userIdsToUpdateSet: Set<string> = new Set();
    const allCards: any[] = [];

    // Collect all non-immune cards from other players' play areas
    for (const player in gameState.players) {
      if (player !== playerId) {
        const playArea = gameState.players[player].playArea;
        for (const cardId in playArea) {
          const card = playArea[cardId];
          if (!card.immune) {
            allCards.push({ ...card, playerId: player });
          }
        }
      }
    }

    // If no cards found, return early
    if (allCards.length === 0) {
      return { updates, secondUpdates, userIdsToUpdate: Array.from(userIdsToUpdateSet) };
    }

    // Find the highest value card(s) among non-immune cards
    const highestValue = allCards.reduce((maxValue: number, card: any) => {
      return card.points > maxValue ? card.points : maxValue;
    }, allCards[0].points);

    // Deactivate all cards with the highest value
    allCards.forEach((card: any) => {
      if (card.points === highestValue && card.points !== 0) {
        const deactivateEffects = deactivateCard(gameState, card.playerId, card.id);
        Object.assign(updates, deactivateEffects);
        userIdsToUpdateSet.add(card.playerId);
      }
    });

    return { updates, secondUpdates, userIdsToUpdate: Array.from(userIdsToUpdateSet) };
  }
}

export class MedEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[] }> {
    const updates: any = {};
    const secondUpdates: any = {};
    const userIdsToUpdate: string[] = [playerId];

    // Get the last played card ID for the player
    const lastPlayedCardId = gameState.players[playerId].lastPlayedCardId;

    if (lastPlayedCardId && gameState.players[playerId].playArea[lastPlayedCardId]) {
      // Reactivate the last played card
      updates[`players/${playerId}/playArea/${lastPlayedCardId}/deactivated`] = false;
    } else {
      console.error(`Last played card ${lastPlayedCardId} not found in player ${playerId}'s play area.`);
    }

    return { updates, secondUpdates, userIdsToUpdate };
  }
}

export class BoomEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[] }> {
    const updates: any = {};
    const secondUpdates: any = {};
    const userIdsToUpdate: string[] = [playerId];

    // Add the Boom card to the persistEffects
    if (!gameState.persistEffects) {
      gameState.persistEffects = [];
    }

    gameState.persistEffects.push({
      playerId,
      deckId: gameState.players[playerId].deckId,
      cardName: 'Boom',
      persistFunction: 'BoomPersist'
    });

    updates[`persistEffects`] = gameState.persistEffects;

    return { updates, secondUpdates, userIdsToUpdate };
  }
}

export class BoomPersistEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string): Promise<any> {
    const updates: any = {};
    const currentTurnPlayerId = gameState.currentTurnPlayerId;
  // start here.  good work.
    for (const player in gameState.players) {
      if (player !== playerId && player !== currentTurnPlayerId) {
        const playArea = gameState.players[player].playArea;
        for (const cardId in playArea) {
          const card = playArea[cardId];
          if (!card.deactivated) {
            updates[`players/${player}/playArea/${cardId}/deactivated`] = true;
          }
        }
      }
    }

    return updates;
  }
}

// Export an object containing all the effect classes
export const MSRVEffects = {
  'Gun Boi': GunBoyEffect,
  'Med': MedEffect,
  'Boom': BoomEffect,
  'BoomPersist': BoomPersistEffect,

  //persistEffects:

  // Add more card names and their corresponding classes here
};
