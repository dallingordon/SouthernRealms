import { CardEffect } from './CardEffect';

export class BloodEffect1 implements CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string, extraData: any): Promise<{ updates: any, userIdsToUpdate: string[] }> {
    console.log(`Applying BloodEffect1 for player ${playerId} with card ${cardId}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = []; // Assuming player has an id property
    userIdsToUpdate.push(playerId);
    // Effect logic goes here

    return Promise.resolve({ updates, userIdsToUpdate });
  }
}

export class BloodEffect2 implements CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string, extraData: any): Promise<{ updates: any, userIdsToUpdate: string[] }> {
    console.log(`Applying BloodEffect2 for player ${playerId} with card ${cardId}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = []; // Assuming player has an id property
    userIdsToUpdate.push(playerId);
    // Effect logic goes here

    return Promise.resolve({ updates, userIdsToUpdate });
  }
}

// Export an object containing all the effect classes
export const BLOODEffects = {
  'BloodEffect1': BloodEffect1,
  'BloodEffect2': BloodEffect2,
  // Add more card names and their corresponding classes here
};
