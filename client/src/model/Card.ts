import {decryptActionBoundArgs} from "next/dist/server/app-render/encryption";

enum CardType {
  Special,
  SpecialValue,
  Flair
}

export enum CardFunction {
  AddValue = "addValue",
  DeactivateCard = "deactivateCard",
  ReactivateCard = "reactivateCard",
  ReturnCard = "returnCard",
  CloneValue = "cloneValue",
  ApplySpecialEffect = "applySpecialEffect",
  NegateEffects = "negateEffects"
}

export default class Card {
  public id: string;
  public name: string;
  public cardId: string;
  public text: string;
  public imgUrl: string;
  public type: CardType;
  public points: number;
  public active: boolean;
  public resolvedPoints: number;
  public functionId: CardFunction | null; // Identifier for the function to execute

  constructor({
    id,
    name,
    cardId,
    text,
    imgUrl,
    type,
    points = 0,
    active = true,
    functionId = null
  }: {
    id: string;
    name: string;
    cardId: string;
    text: string;
    imgUrl: string;
    type: CardType;
    points?: number;
    active: boolean;
    resolvedPoints?: number;
    functionId?: CardFunction;
  }) {
    this.id = id;
    this.name = name;
    this.cardId = cardId;
    this.text = text;
    this.imgUrl = imgUrl;
    this.type = type;
    this.points = points;
    this.active = active;
    this.resolvedPoints = points;
    this.functionId = functionId;
  }
}

function addValue(actionLog: any[]) {

}

function deactivateCard(actionLog: any[]) {

}

function reactivateCard(actionLog: any[]) {

}

function returnCard(actionLog: any[]) {

}

function cloneValue(actionLog: any[]) {

}

function applySpecialEffect(actionLog: any[]) {

}

function negateEffects(actionLog: any[]) {

}

// Function to execute card's function based on the action log
export function executeCardFunction(card: Card, actionLog: any[]): void {
  if (!card.functionId) {
    return;
  }

  switch (card.functionId) {
    case CardFunction.AddValue:
      addValue(actionLog);
      break;
    case CardFunction.DeactivateCard:
      deactivateCard(actionLog);
      break;
    case CardFunction.ReactivateCard:
      reactivateCard(actionLog);
      break;
    case CardFunction.ReturnCard:
      returnCard(actionLog);
      break;
    case CardFunction.CloneValue:
      cloneValue(actionLog);
      break;
    case CardFunction.ApplySpecialEffect:
      applySpecialEffect(actionLog);
      break;
    case CardFunction.NegateEffects:
      negateEffects(actionLog);
      break;
    default:
      throw new Error("Function not implemented.");
  }
}
// not sure i need Effect.ts anymore, or Effect on action.
// also, action really just needs to show what cards are in play areas, and in what order.  russia needs to keep track of order, but really just which ones are immune
// don't worry about russia yet.  or show evyn.