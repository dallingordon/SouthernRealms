import DBUtil from "../util/DBUtil";
import Deck from "./Deck"; // Assuming Deck class handles individual card management
import User from "./User";
import Pile from "./Pile"
/** Player is a User once they have been initialized into a game session */
export default class Player {
  public user: User;
  public deckId: string;
  public drawPile: Pile;
  public hand: Deck;
  public playArea: Deck;
  public discardPile: Pile;

  constructor({ user, deckId }: { user: User; deckId: string }, callback: (player: Player | null, error?: Error) => void) {
    this.user = user;
    this.deckId = deckId;

    DBUtil.getDeck(deckId).then(cards => {
      this.drawPile = new Pile({ id: deckId, cards, cardBackImgUrl: 'url-for-draw-pile', shuffles: true });
      this.discardPile = new Pile({ id: deckId, cards: [], cardBackImgUrl: 'url-for-discard-pile', shuffles: false });
      this.hand = new Deck({ id: deckId, cards: [] });
      this.playArea = new Deck({ id: deckId, cards: [] });

      this.shuffleDrawPile(); // Initial shuffle of the draw pile
      callback(this);
    }).catch(error => {
      callback(null, error);
    });
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

  public resetPlayer(): void {
  // Reset the hand, play area, and discard pile by emptying their cards
  this.hand.cards = [];
  this.playArea.cards = [];
  this.discardPile.cards = [];

  const originalCards = DBUtil.getDeck(this.deckId);

  // Reset the draw pile with the original cards
  this.drawPile.cards = originalCards;

  // Shuffle the draw pile
  this.shuffleDrawPile();
}

}
