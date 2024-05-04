import Card from "./Card";
import {Effect} from "./Effect";

default export class EffectManager {
  private activeEffects: Effect[] = [];

  applyEffect(card: Card): Card {
    for (let effect of this.activeEffects) {
      if (card.type === effect.affectedCardType) { // Assuming 'type' property in Card
        card = effect.transform(card);
      }
    }
    return card;
  }

  addEffect(effect: Effect) {
    this.activeEffects.push(effect);
  }
}