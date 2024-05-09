import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const initialState = []

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
  extraReducers: (builder) => {
    builder.addCase(addBookByApi.fulfilled, (state, action) => {
      return [...state, { ...action.payload, id: uuidv4(), isFavourite: false }]
      //if there are lib immer we can modify state
      //state.push({ ...action.payload, id: uuidv4(), isFavourite: false })
    })
  },
})

export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions

//old version
export const thunkFunction = async (dispatch, getState) => {
  console.log(getState())
  const book = await axios.get("http://localhost:4000/get-book")
  dispatch(addBook({ ...book.data, id: uuidv4(), isFavourite: false }))
  console.log(getState())
}

export const addBookByApi = createAsyncThunk(
  "books/addBookViaApi",
  async () => {
    const book = await axios.get("http://localhost:4000/get-book")
    return { ...book.data, id: uuidv4(), isFavourite: false }
  }
)

export const selectBooks = (state) => state.books
export default bookSlice.reducer
