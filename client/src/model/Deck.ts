import Card from "./Card";

export default class Deck {
  public id: string;

  public cards: Array<Card>;

  public cardBackImgUrl: string;

  constructor({
    id,
    cards,
    cardBackImgUrl,
  }: {
    id: string;
    cards: Array<Card>;
    cardBackImgUrl: string;
  }) {
    this.id = id;
    this.cards = cards;
    this.cardBackImgUrl = cardBackImgUrl;
  }

  public shuffle() {}

  public addCard(cardName: string) {}

  public removeCard(cardName: string) {}
}
