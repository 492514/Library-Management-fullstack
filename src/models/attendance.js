const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  entryTime: {
    type: Date,
    default: null
  },
  exitTime: {
    type: Date,
    default: null
  }
}, { timestamps: true })

attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true })

const attendance = new mongoose.model("attendance",attendanceSchema)

module.exports = attendance