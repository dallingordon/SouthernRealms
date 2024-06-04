import { CardEffect } from './CardEffect';

export class TaxEffect implements CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string): { updates: any, userIdsToUpdate: string[] } {
    console.log(`Applying Tax effect for player ${playerId} with card ${cardId}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = []; // Assuming player has an id property
    userIdsToUpdate.push(playerId);
    // Effect logic goes here

    return { updates, userIdsToUpdate };
  }
}

export class AcceptableLossEffect implements CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string): { updates: any, userIdsToUpdate: string[] } {
    console.log(`Applying Acceptable Loss effect for player ${playerId} with card ${cardId}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = []; // Assuming player has an id property
    userIdsToUpdate.push(playerId);
    // Effect logic goes here

    return { updates, userIdsToUpdate };
  }
}

// Export an object containing all the effect classes
export const UCFEffects = {
  'Tax': TaxEffect,
  'Acceptable Loss': AcceptableLossEffect,
  // Add more card names and their corresponding classes here
};
