import Player from "./Player";
import ActionLog from "./ActionLog";
import { CardFunction, executeCardFunction } from "./Card";  // Assume you have a method like this based on your Card setup

export default class GameSession {
  public sessionId: string;
  public players: Array<Player>;
  public currentTurnIndex: number;
  public isGameActive: boolean;
  public actionLog: ActionLog;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.players = [];
    this.currentTurnIndex = 0;
    this.isGameActive = false;
    this.actionLog = new ActionLog();  // Ensure the action log is initialized
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public startGame(): void {
    this.isGameActive = true;
    this.players.forEach(player => {
      player.shuffleDrawPile();
      this.dealCards(player, 12);
    });
    this.playerAction();
  }

  private dealCards(player: Player, count: number): void {
    for (let i = 0; i < count; i++) {
      player.drawCard();
    }
  }
  // it goes playerAction > assessGameState > nextTurn > playerAction
  public playerAction(): void {
    // Here, you need to determine what action the player is taking.
    // For example, if they play a card:
    let playedCard = this.players[this.currentTurnIndex].playCard();
    if (playedCard) {
      this.executeCardFunction(playedCard);
    }

    this.assessGameState();
  }

  private executeCardFunction(card: Card): void {
    executeCardFunction(card.functionId, this.actionLog);
  }

  public assessGameState(): void {
    // Implementation to check if the game is over
    if (this.isGameOver()) {
      this.endGame();
    } else {
      this.nextTurn();
    }
  }

  private isGameOver(): boolean {
    // Logic to determine if the game is over
    return false;
  }

  public nextTurn(): void {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
    this.playerAction();
  }

  public endGame(): void {
    this.isGameActive = false;
    // Handle game cleanup
  }
}
