import {Effect} from "./Effect";

export default class Action {
  playerId: string;
  type: 'play_card' | 'move_card' | 'cede';
  cardId?: string;  // Optional because a player might cede
  effects: Effect[];

  constructor({ playerId, type, cardId, effects = [] }: { playerId: string; type: 'play_card' | 'move_card' | 'cede'; cardId?: string; effects?: Effect[] }) {
    this.playerId = playerId;
    this.type = type;
    this.cardId = cardId;
    this.effects = effects;
  }

  // Method to add an effect to the action
  addEffect(effect: Effect) {
    this.effects.push(effect);
  }
}