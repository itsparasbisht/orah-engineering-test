import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./activity.tabs.content.module.css"
import ActivityTabsSummary from "./activity.tabs.summary"

function TabContent({ data }) {
  const getColorState = (state) => {
    if (state === "present") return "#13943b"
    if (state === "late") return "#f5a623"
    if (state === "absent") return "#9b9b9b"
    if (state === "unmark") return "#ff0000"
  }

  return (
    <>
      <ActivityTabsSummary data={data} />
      <div className={styles.statusContainer}>
        {data.map((student) => (
          <div className={styles.statusRow}>
            <b>{student.student_id}</b>
            <div className={styles.tickBox} style={{ backgroundColor: getColorState(student.roll_state) }}>
              <FontAwesomeIcon icon="check" size={"lg"} color="white" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TabContent
