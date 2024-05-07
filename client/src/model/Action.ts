import Effect from "./Effect";

export default class Action {
  playerId: string;
  type: 'play_card' | 'cede';
  cardId?: string;  // Optional because a player might cede

  constructor({
                playerId,
                type,
                cardId,
                effects = []
              }: { playerId: string; type: 'play_card' | 'cede'; cardId?: string; }) {
    this.playerId = playerId;
    this.type = type;
    this.cardId = cardId;
  }
}