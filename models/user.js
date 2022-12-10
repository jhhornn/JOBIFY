const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { Schema } = mongoose
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const jwt = require("jsonwebtoken")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({ path: path.join(__dirname, "../config/.env") })

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50
    },

    email: {
      type: String,
      required: [true, "Please provide a name"],
      match: [emailRegex, "Please enter a valid email"],
      unique: true
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6
    }
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.SECRET_EXPIRATION }
  )
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password)
  return isMatch
}

const User = mongoose.model("User", UserSchema)
module.exports = User
