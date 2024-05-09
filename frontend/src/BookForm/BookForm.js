import { useState } from "react"
import { useDispatch } from "react-redux"
//uncomment for classic reducer version
//import { addBook } from "../redux/actionCreators"
import { addBook } from "../slices/bookSlice"

import { v4 as uuidv4 } from "uuid"

const BookForm = () => {
  const [book, setBook] = useState({ title: "", author: "" })
  const dispatch = useDispatch()

  const handleAddBook = (e) => {
    e.preventDefault()

    if (book.title && book.author) {
      dispatch(addBook({ ...book, id: uuidv4(), isFavourite: false }))
      setBook({ title: "", author: "" })
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
      </form>
    </>
  )
}

export default BookForm
