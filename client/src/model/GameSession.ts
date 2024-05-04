import Player from "./Player";
import ActionLog from "./ActionLog";
import EffectManager from "@/model/EffectManager";

export default class GameSession {
  public sessionId: string;
  public players: Array<Player>;
  public currentTurnIndex: number; // Index in the players array for tracking turns
  public isGameActive: boolean;
  public actionLog: ActionLog;
  public effectManager: EffectManager;

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
    this.playerAction();
  }

  private dealCards(player: Player, count: number): void {
    for (let i = 0; i < count; i++) {
      player.drawCard(); // Method from Player class that moves a card from drawPile to hand
    }
  }
  public playerAction(): void {
    //use the currentTurnIndex to see who's turn it is
    //waits for the player to do something to the game state.
    this.assesGameState();
  }

  public assessGameState(): void {
    // perform logic to see if the game is over.  count cards, see who has ceded etc.
    // if it is over, this.endgame();
    // else
    // this.nextTurn();
  }
  public nextTurn(): void {
    // Move to the next player's turn
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
    this.playerAction();
    // Handle actions at the start of a new turn, if necessary
  }

  public endGame(): void {
    this.isGameActive = false;
    // Handle cleanup, calculate final scores, etc.
  }
}

