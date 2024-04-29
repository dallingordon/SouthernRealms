
import { Link } from "react-router-dom"
import styles from "../../styles/components/nav.module.css"
import NavLinks from "./NavLinks"

export default function Nav() {
  return <div className={styles.container}>
    <NavLinks />
  </div>
}