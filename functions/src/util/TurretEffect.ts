import { CardEffect } from './CardEffect';

export class TurretEffect implements CardEffect {
    applyEffect(gameState: any, player: any, cardId: string): any {
        const cardsSinceLastTurn = this.getCardsSinceLastTurn(gameState, player);
        // console.log("applicable cards", cardsSinceLastTurn);

        const updates: any = {};

        if (cardsSinceLastTurn.length === 0) {
            return {};
        }

        // Find the highest value card(s)
        const highestValue = cardsSinceLastTurn.reduce((maxValue: number, card: any) => {
            return card.points > maxValue ? card.points : maxValue;
        }, cardsSinceLastTurn[0].points);

        // Deactivate all cards with the highest value
        cardsSinceLastTurn.forEach((card: any) => {
            if (card.points === highestValue) {

                updates[`players/${card.playerId}/playArea/${card.id}/deactivated`] = true;
                player = gameState.players[card.playerId];
                updates[`players/${card.playerId}/score`] = player.score - card.points;

            }

        });

        return updates;
    }


    getCardsSinceLastTurn(gameState: any, player: any): any[] {
        const cardsSinceLastTurn: any[] = [];
        let moveId = gameState.latestMoveId;
        let thisPlayerId = gameState.currentTurnPlayerId;

        while (moveId) {
            const move = gameState.moves[moveId];
            if (!move || move.playerId === thisPlayerId) break;
            if (move.cardId && gameState.players[move.playerId]?.playArea[move.cardId]) {
                let card = gameState.players[move.playerId].playArea[move.cardId]
                card.playerId = move.playerId;
                cardsSinceLastTurn.push(card);
            }
            if (!move.previousMoveId) break; // this way the first move can still be added above
            moveId = move.previousMoveId;
        }

        return cardsSinceLastTurn;
    }
}
