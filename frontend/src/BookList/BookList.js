import { useDispatch, useSelector } from "react-redux"
//uncomment for classic reducer version
//import { deleteBook, toggleFavourite } from "../redux/actionCreators"
import { deleteBook, selectBooks, toggleFavourite } from "../slices/bookSlice"
import { BsBookmarkStarFill } from "react-icons/bs"
import { BsBookmarkStar } from "react-icons/bs"
import {
  selectAuthorFilter,
  selectFavouriteFilter,
  selectTitleFilter,
} from "../slices/filterSlice"

const BookList = () => {
  //uncomment for classic reducer version
  //const books = useSelector((state) => state.books)
  const books = useSelector(selectBooks)
  const dispatch = useDispatch()

  const isFavouriteSelected = useSelector(selectFavouriteFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const titleFilter = useSelector(selectTitleFilter)

  let filteredBooks = books.filter((book) => {
    let bookByTitle = book.title.includes(titleFilter)
    let bookByAuthor = book.author.includes(authorFilter)
    let matchesFavourite = isFavouriteSelected ? book.isFavourite : true

    return bookByTitle && bookByAuthor && matchesFavourite
  })

  const handleRemoveBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
  }

  const highlightMatches = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, "gi")

    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <>
      <h4>Book List</h4>
      {filteredBooks.length === 0 ? (
        <h4>No books available</h4>
      ) : (
        filteredBooks.map((book) => (
          <ul style={{ backgroundColor: "lightgrey" }} key={book.id}>
            {book.title} by {highlightMatches(book.author, authorFilter)}
            <button
              style={{ margin: "15px" }}
              onClick={() => handleRemoveBook(book.id)}
            >
              remove
            </button>
            <span
              onClick={() => {
                handleToggleFavourite(book.id)
              }}
            >
              {book.isFavourite ? <BsBookmarkStarFill /> : <BsBookmarkStar />}
            </span>
          </ul>
        ))
      )}
    </>
  )
}

export default BookList
