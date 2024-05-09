import { configureStore } from "@reduxjs/toolkit"
//uncomment for classic reducer version
//import bookReducer from "./reducer"
import bookReducer from "../slices/bookSlice"
import filterReducer from "../slices/filterSlice"

export const store = configureStore({
  reducer: {
    books: bookReducer,
    filter: filterReducer,
  },
})
