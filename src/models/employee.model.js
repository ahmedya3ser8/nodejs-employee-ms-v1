import mongoose from "mongoose";

import { DEPARTMENTS } from "../constants/department.js";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    phoneNumber: { 
      type: String, 
      required: true 
    },
    joinDate: { 
      type: Date, 
      default: Date.now
    },
    bio: { 
      type: String,
      default: null
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
      required: true
    },
    position: { 
      type: String, 
      required: true 
    },
    basicSalary: { 
      type: Number,
      required: true,
      default: 0
    },
    allowances: { 
      type: Number,
      default: 0 
    },
    deductions: { 
      type: Number,
      default: 0 
    },
    isActive: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
