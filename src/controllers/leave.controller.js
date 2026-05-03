import catchAsync from "../middlewares/catchAsync.middleware.js";

import ApiError from "../utils/apiError.js";

import Leave from "../models/leave.model.js";
import Employee from "../models/employee.model.js";

// @desc    Create Leave
// @route   POST /api/leaves
// @access  Private/Protect
export const createLeave = catchAsync(async (req, res, next) => {
  const { type, startDate, endDate, reason } = req.body;

  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const leave = await Leave.create({
    type,
    startDate,
    endDate,
    reason,
    employee: employee._id
  });

  res.status(201).json({ 
    success: true, 
    message: 'Leave Created successfully',
    data: leave
  });
});

// @desc    Get All Leaves
// @route   GET /api/leaves
// @access  Private/Admin
export const getLeaves = catchAsync(async (req, res, next) => {
  const leaves = await Leave.find().sort({ createdAt: -1 }).populate({
    path: 'employee',
    select: 'firstName lastName'
  });

  res.status(200).json({ 
    success: true, 
    message: 'Leaves retrieved successfully',
    data: leaves
  });
});

// @desc    Get All Leaves for Specific Employee
// @route   GET /api/leaves/me
// @access  Private/Protect
export const getMyLeaves = catchAsync(async (req, res, next) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const leaves = await Leave.find({ employee: employee._id }).sort({ createdAt: -1 }).populate({
    path: 'employee',
    select: 'firstName lastName'
  });

  res.status(200).json({ 
    success: true, 
    message: 'Leaves retrieved successfully',
    data: leaves
  });
});

// @desc    Get Leaves Stats for Specific Employee
// @route   GET /api/leaves/stats
// @access  Private/Protect
export const getLeaveStats = catchAsync(async (req, res, next) => {
  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee) return next(new ApiError('Employee not found', 404));

  const stats = await Leave.aggregate([
    {
      $match: {
        employee: employee._id
      }
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 }
      }
    }
  ])

  const formatted = {
    sick: 0,
    casual: 0,
    annual: 0,
  };

  stats.forEach((item) => {
    formatted[item._id] = item.count;
  });

  res.status(200).json({ 
    success: true, 
    message: 'Leaves stats retrieved successfully',
    data: formatted
  });
});

// @desc    Update Leave Status
// @route   PATCH /api/leaves/:id
// @access  Private/Admin
export const updateLeaveStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const leave = await Leave.findById(req.params.id).populate({
    path: 'employee',
    select: 'firstName lastName'
  });
  if (!leave) return next(new ApiError('Leave not found', 404));

  leave.status = status;
  await leave.save();

  res.status(200).json({
    success: true,
    message: "Leave status updated successfully",
    data: leave
  });
});
