// ActionLog.ts
import Action from "./Action";  // Import Action type from Action.ts

export default class ActionLog {
  private actions: Action[] = [];

  logAction(action: Action) {
    this.actions.push(action);
    console.log("Action logged:", action);
  }

  getActions(): Action[] {
    return this.actions;
  }
}
