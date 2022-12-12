const express = require("express")
require("express-async-errors")
const morgan = require("morgan")
const { urlencoded } = require("body-parser")
const {
  errorLogger,
  errorResponder,
  invalidPathHandler
} = require("./middlewares/errHandler")

//! extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

//! swagger
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./jobify.yaml")

const app = express()
const authenticateUser = require("./middlewares/authentication")

//! routers
const authRouter = require("./routes/auth")
const jobRouter = require("./routes/jobs")

app.set("trust proxy", 1)
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requestd per windowsMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(urlencoded({ extended: false }))
app.use(morgan("dev"))

//! routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobRouter)

app.get("/", (req, res) => {
  res.send("<h1>Job API</h1><a href='/api-docs'>Documentation</a>")
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.all("*", (req, res, next) => {
  next()
})

//! error handlers
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

module.exports = app
