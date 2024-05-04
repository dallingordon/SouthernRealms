enum CardType {
  Special,
  SpecialValue,
  Flair
}

export default class Card {
  public id: string;
  public name: string;
  public cardId: string;
  public text: string;
  public imgUrl: string;
  public type: CardType;
  public points: number;
  public execute: (() => void) | null; // A function to execute special logic

  constructor({
    id,
    name,
    cardId,
    text,
    imgUrl,
    type,
    points = 0,
    execute = null
  }: {
    id: string;
    name: string;
    cardId: string;
    text: string;
    imgUrl: string;
    type: CardType;
    points?: number;
    execute?: () => void;
  }) {
    this.id = id;
    this.name = name;
    this.cardId = cardId;
    this.text = text;
    this.imgUrl = imgUrl;
    this.type = type;
    this.points = points;
    this.execute = execute;
  }
}