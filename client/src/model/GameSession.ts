import Player from "./Player";
import Action from "./Action";


export default class GameSession {
  public sessionId: string;
  public players: Array<Player>;
  public currentTurnIndex: number;
  public isGameActive: boolean;
  public actionLog: Array<Action>; // i think this should just be an array of actions.  then i can just init it as an empty array.....

  constructor() {
    this.sessionId = null; // Initialize without an ID
    this.players = [];
    this.currentTurnIndex = 0;
    this.isGameActive = false;
    this.actionLog = [];
  }

  private setSessionId(id: string) {
    this.sessionId = id; // Method to update the session ID later
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
      // this.executeCardFunction(playedCard);
    }

    this.assessGameState();
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
