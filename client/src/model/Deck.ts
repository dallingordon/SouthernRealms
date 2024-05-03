import Card from "./Card";

export default class Deck {
  public id: string;

  public cards: Array<Card>;

  public cardBackImgUrl: string;

  constructor({ id, cards }: { id: string; cards: Array<Card> }) {
    this.id = id;
    this.cards = cards;
    this.cardBackImgUrl = this.getCardBack(id);
  }

  public shuffle() {}

  public addCard(cardName: string) {}

  public removeCard(cardName: string) {}

  public getCardBack(id: string): string {
    // make fetch to get the cardback url for this specific deck id
    return "";
  }
}
