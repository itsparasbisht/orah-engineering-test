import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { HomeBoardContext } from "context/home-board/home-board-state"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

export type ActiveRollAction = "filter" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick } = props
  const [homeBoardState, homeBoardDisaptch] = useContext(HomeBoardContext)
  const [callApi, data, loadState, error] = useApi<{ students: Person[] }>({ url: "save-roll" })
  // console.log(callApi, data, loadState, error)

  const saveRoll = () => {
    const dataToApi = homeBoardState.data.map((student) => {
      return {
        student_id: student.id,
        roll_state: student.status,
      }
    })
    callApi({ student_roll_states: dataToApi }).then((res) => {
      homeBoardDisaptch({ type: "TRUNCATE-STATUS" })
    })
  }

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: homeBoardState.total },
              { type: "present", count: homeBoardState.present },
              { type: "late", count: homeBoardState.late },
              { type: "absent", count: homeBoardState.absent },
            ]}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button
              color="inherit"
              onClick={() => {
                // homeBoardDisaptch({ type: "TRUNCATE-STATUS" })
                onItemClick("exit")
              }}
            >
              Exit
            </Button>
            <Button
              color="inherit"
              style={{ marginLeft: Spacing.u2 }}
              onClick={() => {
                saveRoll()
                onItemClick("exit")
              }}
            >
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
