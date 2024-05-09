import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { setError } from "./errorSlice"

const initialState = []

//old version
export const thunkFunction = async (dispatch, getState) => {
  console.log(getState())
  const book = await axios.get("http://localhost:4000/get-book")
  dispatch(addBook({ ...book.data, id: uuidv4(), isFavourite: false }))
  console.log(getState())
}

export const addBookByApi = createAsyncThunk(
  "books/addBookViaApi",
  async (url, thunkAPI) => {
    console.log()
    try {
      const book = await axios.get(url)
      return { ...book.data, id: uuidv4(), isFavourite: false }
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      throw error
    }
  }
)

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload]
    },
    deleteBook: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    toggleFavourite: (state, action) => {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, isFavourite: !item.isFavourite }
          : item
      )
    },
  },
  //OPTION 1
  // extraReducers: (builder) => {
  //   builder.addCase(addBookByApi.fulfilled, (state, action) => {
  //     return [...state, { ...action.payload, id: uuidv4(), isFavourite: false }]
  //     //if there are lib immer we can modify state
  //     //state.push({ ...action.payload, id: uuidv4(), isFavourite: false })
  //   })
  // },
  //OPTION 2
  extraReducers: {
    [addBookByApi.fulfilled]: (state, action) => {
      return [...state, { ...action.payload, id: uuidv4(), isFavourite: false }]
    },
  },
})

export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions
export const selectBooks = (state) => state.books
export default bookSlice.reducer
