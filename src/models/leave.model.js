import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['sick', 'casual', 'annual'],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: 'Employee',
      required: true
    }
  },
  { timestamps: true }
);

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
