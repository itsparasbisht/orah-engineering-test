import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./activity.tabs.content.module.css"

function TabContent({ data }) {
  const getColorState = (state) => {
    if (state === "present") return "#13943b"
    if (state === "late") return "#f5a623"
    if (state === "absent") return "#9b9b9b"
    if (state === "unmark") return "#ff0000"
  }

  return (
    <>
      <div className={styles.statusLookUp}>
        <div className={styles.statusLookUpItem}>
          <p>Total</p>
          <div style={{ backgroundColor: "black" }}>14</div>
        </div>
        <div className={styles.statusLookUpItem}>
          <p>Present</p>
          <div style={{ backgroundColor: "#13943b" }}>3</div>
        </div>
        <div className={styles.statusLookUpItem}>
          <p>Late</p>
          <div style={{ backgroundColor: "#f5a623" }}>5</div>
        </div>
        <div className={styles.statusLookUpItem}>
          <p>Absent</p>
          <div style={{ backgroundColor: "#9b9b9b" }}>1</div>
        </div>
        <div className={styles.statusLookUpItem}>
          <p>Unmark</p>
          <div style={{ backgroundColor: "#ff0000" }}>3</div>
        </div>
      </div>
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
