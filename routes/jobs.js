const express = require("express")
const JobRouter = express.Router()

const {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob
} = require("../controllers/jobs")

JobRouter.route("/").post(createJob).get(getAllJobs)

JobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob)

module.exports = JobRouter
