import { configureStore } from "@reduxjs/toolkit"
import bookReducer from "./reducer"
import filterReducer from "../slices/filterSlice"

export const store = configureStore({
  reducer: {
    books: bookReducer,
    filter: filterReducer,
  },
})
