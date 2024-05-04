import CardCollection from "./CardCollection";
import Card from "./Card";

export default class Pile extends CardCollection {
  public cardBackImgUrl: string;
  public shuffles: boolean;  // Indicates if the pile can be shuffled

  constructor({ id, cards, cardBackImgUrl, shuffles = false }: { id: string; cards: Array<Card>; cardBackImgUrl: string; shuffles?: boolean }) {
    super({ id, cards });
    this.cardBackImgUrl = cardBackImgUrl;
    this.shuffles = shuffles;
  }

  public addToTop(card: Card) {
    this.cards.unshift(card);
  }

  public removeFromTop(): Card | undefined {
    return this.cards.shift();
  }

  public shuffle() {
    if (this.shuffles) {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // ES6 array destructuring swap
      }
    } else {
      throw new Error("This pile cannot be shuffled.");
    }
  }
}
