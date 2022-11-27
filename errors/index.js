const CustomAPIError = require("./custom-error")
const Unauthenticated = require("./unauthenticated")
const BadRequest = require("./bad-request")
const NotFoundError = require("./not-found")

module.exports = {
    CustomAPIError,
    Unauthenticated,
    BadRequest,
    NotFoundError
}
