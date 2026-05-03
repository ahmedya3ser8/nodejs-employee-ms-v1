import catchAsync from "../middlewares/catchAsync.middleware.js";

import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";

import ApiError from "../utils/apiError.js";

// @desc    Create Attendance (first req = clock in) - (second req = clock out)
// @route   POST /api/attendance
// @access  Private/Protect
export const clockInOut = catchAsync(async (req, res, next) => {
  // 1) check if employee exists
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const now = new Date();

  // start of today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // check today's attendance
  let attendance = await Attendance.findOne({ 
    employee: employee._id, 
    date: { $gte: today, $lt: tomorrow } 
  });

  // 2) Clock In
  if (!attendance) {
    const lateTime = new Date();
    lateTime.setHours(9, 0, 0, 0); // after 9

    const status = now > lateTime ? 'late' : 'present';

    attendance = await Attendance.create({
      employee: employee._id,
      date: today,
      checkIn: new Date(),
      status
    })

    return res.status(201).json({ 
      success: true, 
      message: 'Clocked in successfully',
      data: attendance
    });
  }

  // 3) Clock Out
  if (!attendance.checkOut) {
    const workingHours = (now.getTime() - new Date(attendance.checkIn).getTime()) / (1000 * 60 * 60);

    let dayType = null;

    if (workingHours >= 8) dayType = "full day";
    else if (workingHours >= 6) dayType = "three quarter day";
    else if (workingHours >= 4) dayType = "half day";
    else dayType = "short day";

    attendance.checkOut = now;
    attendance.workingHours = Number(workingHours.toFixed(2))
    attendance.dayType = dayType;

    await attendance.save();

    return res.status(200).json({
      success: true, 
      message: "Clocked out successfully",
      data: attendance
    });
  }

  return next(new ApiError("You already clocked in and out today", 400));
});

// @desc    Get Attendance For Employee
// @route   GET /api/attendance
// @access  Private/Protect
export const getAttendance = catchAsync(async (req, res, next) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const attendances = await Attendance.find({ employee: employee._id });

  res.status(200).json({ 
    success: true, 
    message: 'Attendances retrieved successfully',
    data: attendances
  });
});

// @desc    Get Attendance Stats
// @route   GET /api/attendance/stats
// @access  Private/Protect
export const getAttendanceStats = catchAsync(async (req, res, next) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const now = new Date();

  // start of month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const attendances = await Attendance.find({
    employee: employee._id,
    date: { $gte: startOfMonth, $lte: now }
  });

  // 1. Days Present
  const daysPresent = attendances.filter((a) => a.status === "present" || a.status === "late").length;

  // 2. Late Arrivals
  const lateArrivals = attendances.filter((a) => a.status === "late").length;

   // 3. Avg Work Hours
  const totalHours = attendances.reduce((a, v) => a + (v.workingHours || 0),0);

  const avgWorkHours = attendances.length > 0 ? Number((totalHours / attendances.length).toFixed(2)) : 0;

  res.status(200).json({
    success: true,
    data: {
      daysPresent,
      lateArrivals,
      avgWorkHours
    }
  });
});
