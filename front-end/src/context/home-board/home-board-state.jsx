import React, { createContext, useReducer } from "react"

export const HomeBoardContext = createContext()

const initialState = {
  data: [],
  sortBy: "fname",
  sortOrder: "asc",
}

function sortDataByOrder(data, order) {
  if (order === "desc") {
    data.sort((a, b) => (a.first_name > b.first_name ? false : true))
  } else if (order === "asc") {
    data.sort((a, b) => (a.first_name > b.first_name ? true : false))
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-DATA":
      return {
        ...state,
        data: action.payload,
      }
    case "SORT-ORDER":
      if (state.data.students) {
        const data = state.data.students
        sortDataByOrder(data, action.payload)
      }

      return {
        ...state,
        sortOrder: action.payload,
      }
    default:
      return state
  }
}

function HomeBoardState(props) {
  return <HomeBoardContext.Provider value={useReducer(reducer, initialState)}>{props.children}</HomeBoardContext.Provider>
}

export default HomeBoardState
