const User = require("../models/user")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError } = require("../errors")
const { UnauthenticatedError } = require("../errors")

const register = async (req, res, next) => {
  //   const { name, email, password } = req.body
  //   if (!name || !email || !password) {
  //     throw new BadRequestError("Please provide name, email and password")
  //   }
  try {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("Please provide email or password")
  }
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials")
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login
}
