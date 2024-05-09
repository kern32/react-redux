import "./App.css"
import BookForm from "./BookForm/BookForm"
import BookList from "./BookList/BookList"
import Error from "./Error/Error"
import Filter from "./Filter/Filter"

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Book library</h1>
      </header>
      <div className="app-main">
        <BookForm />
        <br />
        <br />
        <Filter />
        <br />
        <br />
        <BookList />
        <Error />
      </div>
    </div>
  )
}

export default App
