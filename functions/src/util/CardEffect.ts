export interface CardEffect {
    applyEffect(gameState: any, player: any, cardId: string): void;
    undoEffect?(gameState: any, player: any, cardId: string): void;
    recalculateScore?(player: any): number;
}
