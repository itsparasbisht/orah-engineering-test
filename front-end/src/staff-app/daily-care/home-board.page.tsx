import React, { useState, useEffect, useContext, useCallback } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { AntSwitch } from "mui-utilities/ant-switch"

import styles from "./home-board.page.module.css"
import { HomeBoardContext } from "context/home-board/home-board-state"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [homeBoardState, homeBoardDisaptch] = useContext(HomeBoardContext)

  const [students, setStudents] = useState([])

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (data) {
      setStudents(data.students)
      homeBoardDisaptch({ type: "ADD-DATA", payload: data.students })
    }
  }, [data])

  useEffect(() => {
    if (homeBoardState.data) {
      setStudents(homeBoardState.data)
    }
  }, [homeBoardState])

  useEffect(() => {
    if (homeBoardState.data) {
      const filteredData = homeBoardState.data.filter((item) => {
        const name = `${item.first_name} ${item.last_name}`
        return name.toLowerCase().includes(homeBoardState.searchQuery.toLowerCase())
      })

      setStudents(filteredData)
    }
  }, [homeBoardState.searchQuery])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && students.length > 0 && (
          <>
            {students.map((s) => {
              return homeBoardState.show === "all" ? (
                <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
              ) : (
                s.status === homeBoardState.show && <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
              )
            })}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props
  const [sortAsc, setSortAsc] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const [homeBoardState, homeBoardDisaptch] = useContext(HomeBoardContext)

  const handleSortOrder = () => {
    setSortAsc(!sortAsc)
  }

  const handleSortBy = (e) => {
    homeBoardDisaptch({ type: "SORT-BY", payload: e.target.value })
  }

  useEffect(() => {
    if (sortAsc) {
      homeBoardDisaptch({ type: "SORT-ORDER", payload: "asc" })
    } else {
      homeBoardDisaptch({ type: "SORT-ORDER", payload: "desc" })
    }
  }, [sortAsc])

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value)
    homeBoardDisaptch({ type: "SEARCH-QUERY", payload: e.target.value })
  }

  return (
    <S.ToolbarContainer>
      <div>
        <div className={styles.optionsContainer}>
          <p>sort by</p>
          <select name="sort-by" id="sort-by" onChange={handleSortBy}>
            <option value="fname">first name</option>
            <option value="lname">last name</option>
          </select>
        </div>
        <div className={styles.switchContainer}>
          <p>asc</p>
          <AntSwitch checked={!sortAsc} onChange={handleSortOrder} name="checkedC" />
          <p>desc</p>
        </div>
      </div>
      <div className={styles.searchInputContainer}>
        <label htmlFor="searchQuery">Search</label>
        <input type="search" name="searchQuery" id="searchQuery" value={searchQuery} onChange={handleSearchQuery} placeholder="start typing..." />
      </div>
      <S.Button
        onClick={() => {
          onItemClick("roll")
        }}
      >
        Start Roll
      </S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
