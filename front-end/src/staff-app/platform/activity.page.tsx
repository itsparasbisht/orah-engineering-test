import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

import styles from "./activity.page.module.css"

export const ActivityPage: React.FC = () => {
  const [callApi, data, loadState, error] = useApi<{ students: Person[] }>({ url: "get-activities" })
  console.log(callApi, data, loadState, error)

  useEffect(() => {
    callApi()
  }, [])

  if (data.activity.length === 0) {
    return <h3 className={styles.noActivity}>no activity yet</h3>
  }

  return <S.Container>Activity Page</S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
