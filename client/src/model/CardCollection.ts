// CardCollection.ts
import Card from "./Card";

export default class CardCollection {
  public id: string;
  public cards: Array<Card>;

  constructor({ id, cards = [] }: { id: string; cards?: Array<Card> }) {
    this.id = id;
    this.cards = cards;
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public removeCard(card: Card) {
    this.cards = this.cards.filter(c => c !== card);
  }
}
