import { CardEffect } from './CardEffect';

export class TurretEffect implements CardEffect {
    async applyEffect(gameState: any, playerId: string, cardId: string): Promise<{ updates: any, userIdsToUpdate: string[] }> {
        const cardsSinceLastTurn = this.getCardsSinceLastTurn(gameState, playerId);
        const updates: any = {};
        const userIdsToUpdate: string[] = [];
        //console.log("cards since",cardsSinceLastTurn);
        if (cardsSinceLastTurn.length === 0) {
            return { updates, userIdsToUpdate };
        }

        // Find the highest value card(s)
        const highestValue = cardsSinceLastTurn.reduce((maxValue: number, card: any) => {
            return card.points > maxValue ? card.points : maxValue;
        }, cardsSinceLastTurn[0].points);

        // Deactivate all cards with the highest value
        // don't forget to remove effects!!
        cardsSinceLastTurn.forEach((card: any) => {
            if (card.points === highestValue) {
                updates[`players/${card.playerId}/playArea/${card.id}/deactivated`] = true;

                userIdsToUpdate.push(card.playerId);
            }
        });
        // console.log("users in turret",userIdsToUpdate);
        return { updates, userIdsToUpdate };
    }


    getCardsSinceLastTurn(gameState: any, playerId: string): any[] {
        const cardsSinceLastTurn: any[] = [];
        let moveId = gameState.latestMoveId;
        let thisPlayerId = playerId;

        while (moveId) {
            //console.log("moveid",moveId);
            const move = gameState.moves[moveId];
            //console.log("moveid",moveId,"player:",move.playerId, "thisPlayerId",thisPlayerId );
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
