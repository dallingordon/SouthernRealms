// ActionLog.ts
import Action from "./Action";  // Import Action type from Action.ts
// where do we like, verify it is the correct users turn? is that logic here or in game session?
// ditto for flares.  is that managed in game session or here? not sure.
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
