const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/.env" })

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(
      `Connected to Mongo! Database name: ${conn.connections[0].name}`
    )
  } catch (err) {
    console.error("Error connecting to mongo", err)
    process.exit(1)
  }
}

module.exports = connectDB
