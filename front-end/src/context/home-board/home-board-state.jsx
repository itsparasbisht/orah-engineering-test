import React, { createContext, useReducer } from "react"

export const HomeBoardContext = createContext()

const initialState = {
  data: [],
  sortBy: "fname",
  sortOrder: "asc",
  searchQuery: "",
  total: 0,
  present: 0,
  late: 0,
  absent: 0,
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

function updateRollData(state) {
  state.present = state.data.filter((roll) => roll.status === "present").length
  state.late = state.data.filter((roll) => roll.status === "late").length
  state.absent = state.data.filter((roll) => roll.status === "absent").length
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-DATA":
      const updateStudentArr = action.payload.map((item) => {
        return {
          ...item,
          status: "unmark",
        }
      })

      return {
        ...state,
        data: updateStudentArr,
        total: action.payload.length,
      }
    case "SORT-ORDER":
      if (state.data) {
        const data = state.data
        sortData(data, action.payload, state.sortBy)
      }

      return {
        ...state,
        sortOrder: action.payload,
      }
    case "SORT-BY":
      if (state.data) {
        const data = state.data
        sortData(data, state.sortOrder, action.payload)
      }

      return {
        ...state,
        sortBy: action.payload,
      }

    case "SEARCH-QUERY":
      return {
        ...state,
        searchQuery: action.payload,
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
      const updatedStudentArr = state.data.map((student) => {
        return {
          ...student,
          status: "unmark",
        }
      })
      return {
        ...state,
        data: updatedStudentArr,
        present: 0,
        late: 0,
        absent: 0,
      }
    default:
      return state
  }
}

function HomeBoardState(props) {
  return <HomeBoardContext.Provider value={useReducer(reducer, initialState)}>{props.children}</HomeBoardContext.Provider>
}

export default HomeBoardState
