import { CardEffect } from './CardEffect';
import { drawCardFunction } from '../index';
// Initialize Firebase admin SDK


export class TaxEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string ,extraData: any): Promise<{ updates: any, userIdsToUpdate: string[] }> {
    console.log(`Applying Tax effect for player ${playerId} with card ${cardId} and specialdata ${extraData}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = [playerId];

    let parsedExtraData: any;
    try {
      parsedExtraData = JSON.parse(extraData);
    } catch (error) {
      console.error('Error parsing extraData:', error);
      return { updates, userIdsToUpdate };
    }

    const drawResult = await drawCardFunction({
      gameSessionId: gameState.sessionId,
      playerId: playerId,
      numberOfCards: 2 // Drawing 2 cards as per the Tax effect
    });

    // Handle the result if needed
    if (drawResult.success) {
      console.log(`Player ${playerId} drew 2 cards successfully.`);
    } else {
      console.error(`Failed to draw cards for player ${playerId}.`);
    }


    // Process the parsedExtraData to discard a card
    if (parsedExtraData && parsedExtraData.discardCardId) {
      const discardCardId = parsedExtraData.discardCardId;
      if (gameState.players[playerId].hand[discardCardId]) {
        // Remove the discarded card from hand
        updates[`players/${playerId}/hand/${discardCardId}`] = null;
      } else {
        console.error(`Card ${discardCardId} not found in player ${playerId}'s hand.`);
      }
    } else {
      console.error(`No discardCardId found in parsedExtraData.`);
    }

    return { updates, userIdsToUpdate };
  }
}

export class AcceptableLossEffect implements CardEffect {
  async applyEffect(gameState: any, playerId: string, cardId: string, extraData: any): Promise<{ updates: any, userIdsToUpdate: string[] }> {
    console.log(`Applying Acceptable Loss effect for player ${playerId} with card ${cardId} and extraData ${extraData}`);

    const updates: any = {};
    const userIdsToUpdate: string[] = [playerId];

    return { updates, userIdsToUpdate };
  }
}

// Export an object containing all the effect classes
export const UCFEffects = {
  'Tax': TaxEffect,
  'Acceptable Loss': AcceptableLossEffect,
  // Add more card names and their corresponding classes here
};
