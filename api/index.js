const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

app.get("/get-book", function (req, res) {
  let title = Math.floor(Math.random() * 1000)
  let author = Math.floor(Math.random() * 1000)
  let json = `{"title":"${title}","author":"${title}"}`
  setTimeout(() => {
    res.send(json)
  }, 3000)
})

app.listen(4000, () => {
  console.log("Server is running")
})
