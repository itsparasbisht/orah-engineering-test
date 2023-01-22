import React, { createContext, useReducer } from "react"

export const RollContext = createContext()

const initialState = {
  data: [],
  total: 0,
  present: null,
  late: null,
  absent: null,
}

function updateRollData(state) {
  state.total = state.data.length
  state.present = state.data.filter((roll) => roll.status === "present").length
  state.late = state.data.filter((roll) => roll.status === "late").length
  state.absent = state.data.filter((roll) => roll.status === "absent").length
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-DATA":
      return {
        ...state,
        data: action.payload,
        total: action.payload.length,
      }
    case "UPDATE-STATUS":
      const id = action.payload.id
      const status = action.payload.status

      const rollNo = state.data.find((item) => item.id === id)

      if (rollNo) {
        rollNo.status = status
        updateRollData(state)
      }
      return {
        ...state,
      }

    case "TRUNCATE-STATUS":
      return {
        ...state,
        present: 0,
        late: 0,
        absent: 0,
      }
    default:
      return state
  }
}

function RollState(props) {
  return <RollContext.Provider value={useReducer(reducer, initialState)}>{props.children}</RollContext.Provider>
}

export default RollState
