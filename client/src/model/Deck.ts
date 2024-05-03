import Card from "./Card";

export default class Deck {
  public id: string;

  public cards: Array<Card>;

  constructor({ id, cards }: { id: string; cards: Array<Card> }) {
    this.id = id;
    this.cards = cards;
  }

  public shuffle() {}

  public addCard(cardName: string) {}

  public removeCard(cardName: string) {}
}
