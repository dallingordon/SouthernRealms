
import CardCollection from "./CardCollection"; // Ensure this path is correct

export default class Deck extends CardCollection {


  public moveCard(fromIndex: number, toIndex: number) {
    if (fromIndex < 0 || fromIndex >= this.cards.length || toIndex < 0 || toIndex >= this.cards.length || fromIndex === toIndex) {
      throw new Error("Invalid index provided.");
    }
    const [card] = this.cards.splice(fromIndex, 1);
    this.cards.splice(toIndex, 0, card);
  }
}
