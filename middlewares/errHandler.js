// const { CustomAPIError } = require("../errors")
const { StatusCodes } = require("http-status-codes")

const errorLogger = (err, req, res, next) => {
  console.error("\x1b[31m", err)
  next(err)
}

const errorResponder = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later"
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ message: err.message })
  // }
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",")
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }
  if (errorResponder.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
  // else {
  //   next(err)
  // }
}

const invalidPathHandler = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: `${req.originalUrl} is not a valid path`
  })
}

module.exports = {
  errorLogger,
  errorResponder,
  invalidPathHandler
}
