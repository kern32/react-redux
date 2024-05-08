import {
  setReset,
  setTitleFilter,
  setAuthorFilter,
  setFavourite,
} from "../slices/filterSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectFavouriteFilter,
} from "../slices/filterSlice"

const Filter = () => {
  const dispatch = useDispatch()

  const authorFilter = useSelector(selectAuthorFilter)
  const titleFilter = useSelector(selectTitleFilter)
  const favouriteFilter = useSelector(selectFavouriteFilter)

  const handleTitleFilter = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleResetFiletr = () => {
    dispatch(setReset())
  }

  const handleOnlyFavourite = (e) => {
    dispatch(setFavourite())
  }

  return (
    <>
      <div>Filter</div>
      <input
        onChange={handleTitleFilter}
        value={titleFilter}
        placeholder="Title"
        type="text"
      />
      <input
        onChange={handleAuthorFilter}
        value={authorFilter}
        placeholder="Author"
        type="text"
      />

      <button onClick={handleResetFiletr}>Reset</button>
      <label>
        <input
          type="checkbox"
          checked={favouriteFilter}
          onChange={handleOnlyFavourite}
        />
        Favourite
      </label>
    </>
  )
}

export default Filter
