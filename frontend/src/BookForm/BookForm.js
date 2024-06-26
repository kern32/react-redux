import { useState } from "react"
import { useDispatch } from "react-redux"
//uncomment for classic reducer version
//import { addBook } from "../redux/actionCreators"
//uncomment for classic reducer version
//import { addBook, addBookByApi, thunkFunction } from "../slices/bookSlice"

import { FaSpinner } from "react-icons/fa"
import { addBook, addBookByApi } from "../slices/bookSlice"
import { v4 as uuidv4 } from "uuid"
import { setError } from "../slices/errorSlice"
import "./BookForm.css"

const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "" })
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleRandomViaApi = async () => {
    //old version
    //dispatch(thunkFunction)

    try {
      setIsLoading(true)
      await dispatch(addBookByApi("http://localhost:4000/get-book"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomViaApiWithError = () => {
    dispatch(addBookByApi("http://localhost:5000/get-book"))
  }

  const handleAddBook = (e) => {
    e.preventDefault()

    if (book.title && book.author) {
      dispatch(addBook({ ...book, id: uuidv4(), isFavourite: false }))
      setBook({ title: "", author: "" })
    } else {
      console.log("error")
      dispatch(setError("Title and author is empty!"))
    }
  }

  return (
    <>
      <h4>Book Form</h4>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          value={book.title}
          id="title"
          placeholder="title"
          onChange={(e) => {
            setBook({ ...book, title: e.target.value })
          }}
        />
        <br />
        <input
          type="text"
          id="author"
          value={book.author}
          placeholder="author"
          onChange={(e) => {
            setBook({ ...book, author: e.target.value })
          }}
        />
        <br />

        <button type="submit">Add</button>
        <button type="button" onClick={handleRandomViaApi}>
          {isLoading ? (
            <>
              <span>Loading ...</span>
              <FaSpinner className="spin" />
            </>
          ) : (
            <span>Add random from API</span>
          )}
        </button>

        <button type="button" onClick={handleRandomViaApiWithError}>
          Show error
        </button>
      </form>
    </>
  )
}

export default BookForm
