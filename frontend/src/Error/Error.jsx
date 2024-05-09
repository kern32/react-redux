import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { clearError, selectError } from "../slices/errorSlice"

const Error = () => {
  const error = useSelector(selectError)

  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  return <ToastContainer position="top-right" autoClose="2000" />
}

export default Error
