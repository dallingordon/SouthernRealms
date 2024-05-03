import styles from "../../styles/components/sidenav.module.css"
import NavLinks from "./NavLinks"
export default function SideNav() {
  return <div className={styles.sidenav}><NavLinks/></div>
}