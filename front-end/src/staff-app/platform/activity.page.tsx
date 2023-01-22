import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

import styles from "./activity.page.module.css"
import ActivityTabs from "./activity.tabs"

export const ActivityPage: React.FC = () => {
  const [callApi, data, loadState, error] = useApi<{ students: Person[] }>({ url: "get-activities" })
  console.log(callApi, data, loadState, error)

  useEffect(() => {
    callApi()
  }, [])

  return (
    <div>
      {loadState === "loading" && <h3 className={styles.noActivity}>loading...</h3>}

      {loadState === "error" && <h3 className={styles.noActivity}>error while loading!</h3>}

      {loadState === "loaded" && data?.activity.length === 0 && <h3 className={styles.noActivity}>no activity yet</h3>}

      {loadState === "loaded" && data?.activity.length > 0 && <ActivityTabs activity={data?.activity} />}
    </div>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
