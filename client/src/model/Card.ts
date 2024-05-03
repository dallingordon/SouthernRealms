export default class Card {
  public id: string;
  public name: string;
  public cardId: string;
  public text: string;

  constructor({
    id,
    name,
    cardId,
    text,
  }: {
    id: string;
    name: string;
    cardId: string;
    text: string;
  }) {
    this.id = id;
    this.name = name;
    this.cardId = cardId;
    this.text = text;
  }
}
