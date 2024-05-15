import {decryptActionBoundArgs} from "next/dist/server/app-render/encryption";


export default class Card {
  public id: string;
  public name: string;
  public text: string;
  public imgUrl: string;
  public type: string;
  public points: number;
  public active: boolean;
  public resolvedPoints: number;

  constructor({
    id,
    name,
    text,
    imgUrl,
    type,
    points = 0
  }: {
    id: string;
    name: string;
    text: string;
    imgUrl: string;
    type: string;
    points?: number;
  }) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.imgUrl = imgUrl;
    this.type = type;
    this.points = points;
    this.active = true;
    this.resolvedPoints = points;
  }
}

// not sure i need Effect.ts anymore, or Effect on action.
// also, action really just needs to show what cards are in play areas, and in what order.  russia needs to keep track of order, but really just which ones are immune
// don't worry about russia yet.  or show evyn.