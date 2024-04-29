import Link from "next/link";

export default function NavLinks() {
 return  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/play">Play</Link>
    </li>
  </ul>
}