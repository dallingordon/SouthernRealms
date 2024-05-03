import PlayLayout from "@/components/layout/PlayLayout"
import styles from "../styles/pages/play.module.css"
import dbUtil from "../util/dbUtil"


export default function Play() {

  dbUtil.registerGame();
  console.log("posted")

  return <PlayLayout>
    <div>PLAY</div>
  </PlayLayout>
}