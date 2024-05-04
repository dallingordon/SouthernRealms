import Player from "./Player";

export default class GameSession {
  public sessionId: string;
  public players: Array<Player>;
  public currentTurnIndex: number; // Index in the players array for tracking turns
  public isGameActive: boolean;
  public actionLog: ActionLog;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.players = [];
    this.currentTurnIndex = 0;
    this.isGameActive = false;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
    // You could implement logic to notify other players or update the game state here
  }

  public startGame(): void {
    this.isGameActive = true;
    this.players.forEach(player => {
      player.shuffleDrawPile(); // Shuffle each player's deck
      this.dealCards(player, 12); // Deal 12 cards to each player
    });
    // Set up any additional game state or turn order logic here
  }

  private dealCards(player: Player, count: number): void {
    for (let i = 0; i < count; i++) {
      player.drawCard(); // Method from Player class that moves a card from drawPile to hand
    }
  }

  public nextTurn(): void {
    // Move to the next player's turn
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
    // Handle actions at the start of a new turn, if necessary
  }

  public endGame(): void {
    this.isGameActive = false;
    // Handle cleanup, calculate final scores, etc.
  }
}

