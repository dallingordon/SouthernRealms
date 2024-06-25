import { CardEffect } from './CardEffect';

interface EffectNode {
    action: string;
    value: number;
    nextEffect: EffectNode | null;
}

export class ClonerEffect implements CardEffect {
    applyEffect(gameState: any, playerId: string, clonerCardId: string): Promise<{ updates: any, secondUpdates: any, userIdsToUpdate: string[]  }> {
        const updates: any = {};
        const secondUpdates: any = {};
        const userIdsToUpdate: string[] = []; // Assuming player has an id property
        userIdsToUpdate.push(playerId);
        const player = gameState.players[playerId];
        // worked.  now i need to make this a linked list and i need to keep firsteffect and latestEffect.  manage all that.
        Object.values(player.playArea as Record<string, any>).forEach((card: any) => {
            const newEffect: EffectNode = {
                action: "multiply",
                value: 2,
                nextEffect: null
            };

            if (!card.appliedEffects) {
                card.appliedEffects = {};
            }

            // Store the effect under the clonerCardId in the appliedEffects map
            card.appliedEffects[clonerCardId] = newEffect;

            // No score calculation here, just prepare updates
            updates[`players/${playerId}/playArea/${card.id}/appliedEffects/${clonerCardId}`] = newEffect;
        });

        return Promise.resolve({ updates, secondUpdates, userIdsToUpdate });
    }
}
