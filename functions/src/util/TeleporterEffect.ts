import { CardEffect, removeCardEffects } from './CardEffect';

export class TeleporterEffect implements CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, userIdsToUpdate: string[] }> {
    let updates: any = {};
    const userIdsToUpdate: string[] = [];

    const player = gameState.players[playerId];
    const lastCardId = player.lastPlayedCardId;
    const lastCard = player.playArea[lastCardId];

    const effectRemovalUpdates = removeCardEffects(gameState, playerId, lastCardId);
    updates = { ...updates, ...effectRemovalUpdates };

    if (!lastCard) {
      console.log("x");
    }

    // Remove all effects and deactivated status
    delete lastCard.appliedEffects;
    delete lastCard.deactivated;
    console.log(lastCard)
    // Move the card back to the player's hand
    // player.hand[lastCardId] = lastCard;


    // Update links in the playArea
    if (lastCard.previousCardId) {
      updates[`players/${playerId}/playArea/${lastCard.previousCardId}/nextCardId`] = cardId;
    }
    if (lastCardId === player.firstPlayedCardId) {
      updates[`players/${playerId}/firstPlayedCardId`] = cardId;
    }
    player.lastPlayedCardId = cardId;
    delete player.playArea[lastCardId];

    // Prepare updates
    updates[`players/${playerId}/hand/${lastCardId}`] = lastCard;
    updates[`players/${playerId}/playArea/${lastCardId}`] = null;
    updates[`players/${playerId}/lastPlayedCardId`] = player.lastPlayedCardId;

    if (player.firstPlayedCardId === lastCardId) {
      updates[`players/${playerId}/firstPlayedCardId`] = cardId;
    }



    userIdsToUpdate.push(playerId);

    return Promise.resolve({ updates, userIdsToUpdate });
  }
}
