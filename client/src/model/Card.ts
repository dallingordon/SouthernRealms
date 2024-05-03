export default class Card {
  public id: string;
  public name: string;
  public cardId: string;
  public text: string;
  public imgUrl: string;

  constructor({
    id,
    name,
    cardId,
    text,
    imgUrl,
  }: {
    id: string;
    name: string;
    cardId: string;
    text: string;
    imgUrl: string;
  }) {
    this.id = id;
    this.name = name;
    this.cardId = cardId;
    this.text = text;
    this.imgUrl = imgUrl;
  }
}
