import Deck from "./Deck"; // Assuming Deck class handles individual card management

export default class Player {
  public userId: string;
  public playerName: string;
  public deck: Deck;
  public drawPile: Deck;
  public hand: Deck;
  public playArea: Deck;
  public discardPile: Deck;

  constructor({
    userId,
    playerName,
    deck,
  }: {
    userId: string;
    playerName: string;
    deck: Deck;
  }) {
    this.userId = userId;
    this.playerName = playerName;
    this.deck = deck;
    // Initialize each player's card areas using the chosen deck
    this.drawPile = new Deck({ id: `draw-${userId}`, cards: [...deck.cards] });
    this.hand = new Deck({ id: `hand-${userId}`, cards: [] });
    this.playArea = new Deck({ id: `play-${userId}`, cards: [] });
    this.discardPile = new Deck({ id: `discard-${userId}`, cards: [] });

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
