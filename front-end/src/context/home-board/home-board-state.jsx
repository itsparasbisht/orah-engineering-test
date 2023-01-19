import React, { createContext, useReducer } from "react"

export const HomeBoardContext = createContext()

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

function HomeBoardState(props) {
  return <HomeBoardContext.Provider value={useReducer(reducer, initialState)}>{props.children}</HomeBoardContext.Provider>
}

export default HomeBoardState
