import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./activity.tabs.content.module.css"

function TabContent({ data }) {
  console.log(data)
  return (
    <div className={styles.statusContainer}>
      {data.map((student) => (
        <div className={styles.statusRow}>
          <b>{student.student_id}</b>
          <div className={styles.tickBox} style={{ backgroundColor: "red" }}>
            <FontAwesomeIcon icon="check" size={"lg"} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TabContent
