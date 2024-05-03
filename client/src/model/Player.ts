import DBUtil from "../util/DBUtil";
import Deck from "./Deck"; // Assuming Deck class handles individual card management
import User from "./User";

/** Player is a User once they have been initialized into a game session */
export default class Player {
  public user: User;
  public deckId: string;
  public drawPile: Deck;
  public hand: Deck;
  public playArea: Deck;
  public discardPile: Deck;

  constructor({ user, deckId }: { user: User; deckId: string }) {
    this.user = user;
    this.deckId = deckId;

    const cards = DBUtil.getDeck(deckId);

    this.drawPile = new Deck({ id: deckId, cards });

    this.hand = new Deck({ id: deckId, cards: [] });
    this.playArea = new Deck({ id: deckId, cards: [] });
    this.discardPile = new Deck({ id: deckId, cards: [] });

    this.shuffleDrawPile(); // Initial shuffle of the draw pile
  }

  public drawCard(): void {
    // Assuming the first card is drawn (shift removes and returns the first element)
    const card = this.drawPile.cards.shift();
    if (card) {
      this.hand.cards.push(card);
    }
  }

  public playCard(cardIndex: number): void {
    const card = this.hand.cards.splice(cardIndex, 1)[0];
    this.playArea.cards.push(card);
  }

  public discardCard(cardIndex: number): void {
    const card = this.hand.cards.splice(cardIndex, 1)[0];
    this.discardPile.cards.push(card);
  }

  public shuffleDrawPile(): void {
    this.drawPile.shuffle();
  }
}
