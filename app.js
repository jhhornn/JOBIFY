const express = require("express")
require("express-async-errors")
const morgan = require("morgan")
const { urlencoded } = require("body-parser")
const {
  errorLogger,
  errorResponder,
  invalidPathHandler
} = require("./middlewares/errHandler")

const app = express()

// routers
const authRouter = require("./routes/auth")
const jobRouter = require("./routes/jobs")


app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(morgan("dev"))


//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobRouter)

app.get("/", (req, res) => {
  res.send("<h1>Job API</h1><a href='/api/v1/jobs'>Jobs route</a>")
})


app.all("*", (req, res, next) => {
  next()
})

// error handlers
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app
