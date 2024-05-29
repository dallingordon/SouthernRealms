import { CardEffect } from './CardEffect';

export class ClonerEffect implements CardEffect {
    applyEffect(gameState: any, player: any, cardId: string): void {
        Object.values(player.playArea as Record<string, any>).forEach((card: any) => {
            if (!card.doubled) {
                card.points *= 2;
                card.doubled = true;
            }
        });
    }

    recalculateScore(player: any): number {
        return Object.values(player.playArea as Record<string, any>).reduce((score: number, card: any) => {
            return card.deactivated ? score : score + card.points;
        }, 0);
    }
}
