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
    default:
      return state
  }
}

function RollState(props) {
  return <RollContext.Provider value={useReducer(reducer, initialState)}>{props.children}</RollContext.Provider>
}

export default RollState
