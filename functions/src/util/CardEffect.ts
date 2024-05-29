export interface CardEffect {
    applyEffect(gameState: any, playerId: string, cardId: string): void;
    undoEffect?(gameState: any, playerId: string, cardId: string): void;
    recalculateScore?(player: any): number;
}
