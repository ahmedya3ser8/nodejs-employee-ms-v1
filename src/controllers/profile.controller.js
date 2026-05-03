import catchAsync from "../middlewares/catchAsync.middleware.js";

import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";

import ApiError from "../utils/apiError.js";

// @desc    Get User Profile
// @route   GET /api/profile
// @access  Private/Protect
export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ApiError('User not found', 404));

  const employee = await Employee.findOne({ user: user._id }).populate({
    path: 'user',
    select: '-password'
  });
  if (!employee) return next(new ApiError('Employee not found', 400));

  res.status(200).json({ 
    success: true, 
    message: 'User retrieved successfully',
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      bio: employee.bio,
      email: user.email,
    }
  });
});

// @desc    Update User Profile
// @route   PATCH /api/profile
// @access  Private/Protect
export const updateProfile = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, position, bio } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return next(new ApiError('User not found', 404));

  if (email) user.email = email;

  const employee = await Employee.findOne({ user: user._id }).populate({
    path: 'user',
    select: '-password'
  });
  if (!employee) return next(new ApiError('Employee not found', 404));

  if (firstName) employee.firstName = firstName;
  if (lastName) employee.lastName = lastName;
  if (bio) employee.bio = bio;
  if (position) employee.position = position;

  await employee.save();
  await user.save();

  res.status(200).json({
    success: true, 
    message: "User updated successfully",
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      bio: employee.bio,
      email: user.email,
    }
  });
});

