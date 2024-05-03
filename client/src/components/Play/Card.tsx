import CardType from "../../model/Card";

export default function Card(card: CardType) {
  return <div>
    <p>{card.name}</p>
    <p>{card.text}</p>
  </div>
}