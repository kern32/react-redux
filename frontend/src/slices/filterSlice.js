import { createSlice } from "@reduxjs/toolkit"

const initialState = { author: "", title: "", isFavourite: false }

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, actions) => {
      return { ...state, title: actions.payload }
    },
    setAuthorFilter: (state, actions) => {
      return { ...state, author: actions.payload }
    },
    setReset: () => {
      return initialState
    },
    setFavourite: (state) => {
      return { ...state, isFavourite: !state.isFavourite }
    },
  },
})

export const { setTitleFilter, setAuthorFilter, setReset, setFavourite } =
  filterSlice.actions
export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author
export const selectFavouriteFilter = (state) => state.filter.isFavourite
export default filterSlice.reducer
