import Link from "next/link";

export default function NavLinks() {
 return  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/play">Play</Link>
    </li>
    <li>
      <Link href="/CreateGame">CreateGame</Link>
    </li>
    <li>
      <Link href="/AddPlayer">Add Player</Link>
    </li>
  </ul>
}