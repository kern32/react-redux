import * as actionTypes from "./actionTypes"

const initialState = []

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload]
    case actionTypes.DELETE_BOOK:
      return state.filter((item) => item.id !== action.payload)
    case actionTypes.TOGGLE_FAVOURITE:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, isFavourite: !item.isFavourite }
          : item
      )

    default:
      return state
  }
}

export default bookReducer
