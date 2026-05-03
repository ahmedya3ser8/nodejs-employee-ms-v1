import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    checkIn: {
      type: Date,
      default: null
    },
    checkOut: {
      type: Date,
      default: null
    },
    workingHours: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present'
    },
    dayType: {
      type: String,
      enum: ['full day', 'three quarter day', 'half day', 'short day'],
      default: null
    },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: 'Employee',
      required: true
    }
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
