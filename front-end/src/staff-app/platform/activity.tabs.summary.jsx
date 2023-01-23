import React from "react"
import styles from "./activity.tabs.content.module.css"

function ActivityTabsSummary({ data }) {
  const rollStateSummary = { total: data.length, present: 0, late: 0, absent: 0, unmark: 0 }
  data.forEach((student) => {
    if (student.roll_state === "present") rollStateSummary.present++
    if (student.roll_state === "late") rollStateSummary.late++
    if (student.roll_state === "absent") rollStateSummary.absent++
    if (student.roll_state === "unmark") rollStateSummary.unmark++
  })

  return (
    <div className={styles.statusLookUp}>
      <div className={styles.statusLookUpItem}>
        <p>Total</p>
        <div style={{ backgroundColor: "black" }}>{rollStateSummary.total}</div>
      </div>
      <div className={styles.statusLookUpItem}>
        <p>Present</p>
        <div style={{ backgroundColor: "#13943b" }}>{rollStateSummary.present}</div>
      </div>
      <div className={styles.statusLookUpItem}>
        <p>Late</p>
        <div style={{ backgroundColor: "#f5a623" }}>{rollStateSummary.late}</div>
      </div>
      <div className={styles.statusLookUpItem}>
        <p>Absent</p>
        <div style={{ backgroundColor: "#9b9b9b" }}>{rollStateSummary.absent}</div>
      </div>
      <div className={styles.statusLookUpItem}>
        <p>Unmark</p>
        <div style={{ backgroundColor: "#ff0000" }}>{rollStateSummary.unmark}</div>
      </div>
    </div>
  )
}

export default ActivityTabsSummary
