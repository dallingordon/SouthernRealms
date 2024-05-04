import Card from "./Card";
import exp from "constants";

export enum EffectScope {
  Immediate,
  Persistent
}

export class Effect {
  affectedCardType: string;
  description: string;
  scope: EffectScope;
  transform: (card: Card) => Card;

  constructor({
    affectedCardType,
    description,
    scope = EffectScope.Immediate,
    transform
  }: {
    affectedCardType: string;
    description: string;
    scope?: EffectScope;
    transform: (card: Card) => Card;
  }) {
    this.affectedCardType = affectedCardType;
    this.description = description;
    this.scope = scope;
    this.transform = transform;
  }
}


