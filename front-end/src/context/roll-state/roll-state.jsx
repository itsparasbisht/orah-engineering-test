import React, { createContext, useReducer } from "react"

export const RollContext = createContext()

const initialState = {
  data: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-DATA":
      return {
        ...state,
        data: action.payload,
      }
    case "UPDATE":
      const id = action.payload.id
      const status = action.payload.status

      const rollNo = state.data.find((item) => item.id === id)

      if (rollNo) {
        rollNo.status = status
      }
      return state
    default:
      return state
  }
}

function RollState(props) {
  return <RollContext.Provider value={useReducer(reducer, initialState)}>{props.children}</RollContext.Provider>
}

export default RollState
