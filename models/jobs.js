const mongoose = require("mongoose")
const { Schema } = mongoose
const objectId = Schema.Types.ObjectId

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending"
    },
    createdBy: {
      type: objectId,
      ref: "User",
      required: [true, "Please provide user"]
    }
  },
  { timestamps: true }
)

const Job = mongoose.model("Job", JobSchema)
module.exports = Job
