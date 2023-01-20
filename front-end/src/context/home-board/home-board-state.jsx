import React, { createContext, useReducer } from "react"

export const HomeBoardContext = createContext()

const initialState = {
  data: [],
  sortBy: "fname",
  sortOrder: "asc",
  searchQuery: "",
}

function sortData(data, order, sortBy) {
  if (order === "desc") {
    if (sortBy === "fname") {
      data.sort((a, b) => (a.first_name > b.first_name ? false : true))
    }
    if (sortBy === "lname") {
      data.sort((a, b) => (a.last_name > b.last_name ? false : true))
    }
  } else if (order === "asc") {
    if (sortBy === "fname") {
      data.sort((a, b) => (a.first_name > b.first_name ? true : false))
    }
    if (sortBy === "lname") {
      data.sort((a, b) => (a.last_name > b.last_name ? true : false))
    }
  }
}

function queryFilter(data, query) {
  const filteredData = data.filter((item) => {
    const name = `${item.first_name} ${item.last_name}`
    return name.toLowerCase().includes(query.toLowerCase())
  })

  return filteredData
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-DATA":
      action.payload.students.sort((a, b) => (a.first_name > b.first_name ? true : false))

      return {
        ...state,
        data: action.payload,
      }
    case "SORT-ORDER":
      if (state.data.students) {
        const data = state.data.students
        sortData(data, action.payload, state.sortBy)
      }

      return {
        ...state,
        sortOrder: action.payload,
      }
    case "SORT-BY":
      if (state.data.students) {
        const data = state.data.students
        sortData(data, state.sortOrder, action.payload)
      }

      return {
        ...state,
        sortBy: action.payload,
      }

    case "SEARCH-QUERY":
      // let filteredData = []
      // if (state.data.students) {
      //   const data = state.data.students
      //   filteredData = queryFilter(data, action.payload)
      //   state.data.students = filteredData
      // }

      return {
        ...state,
        searchQuery: action.payload,
      }
    default:
      return state
  }
}

function HomeBoardState(props) {
  return <HomeBoardContext.Provider value={useReducer(reducer, initialState)}>{props.children}</HomeBoardContext.Provider>
}

export default HomeBoardState
