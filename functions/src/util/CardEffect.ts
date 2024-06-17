export interface CardEffect {
  applyEffect(gameState: any, playerId: string, cardId: string, extraData?: any): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[] }>;

}

export function removeCardEffects(gameState: any, playerId: string, cardId: string): any {
  const player = gameState.players[playerId];
  const updates: any = {};

  if (!player || !player.playArea) {
    return updates;
  }

  for (const [cardKey, card] of Object.entries(player.playArea)) {
    const typedCard = card as { appliedEffects?: Record<string, any> }; // Type annotation
    if (typedCard.appliedEffects && typedCard.appliedEffects[cardId]) {
      updates[`players/${playerId}/playArea/${cardKey}/appliedEffects/${cardId}`] = null;
    }
  }

  return updates;
}

export function deactivateCard(gameState: any, playerId: string, cardId: string): any {
   const updates: any = {};

  // Deactivate the card
  updates[`players/${playerId}/playArea/${cardId}/deactivated`] = true;

  // Remove any effects applied by the deactivated card
  const effectsRemovalUpdates = removeCardEffects(gameState, playerId, cardId);

  // Merge the updates
  Object.assign(updates, effectsRemovalUpdates);

  return updates;
}