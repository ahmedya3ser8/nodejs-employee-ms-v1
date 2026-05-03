import { body } from "express-validator";
import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import validate from "../middlewares/validate.middleware.js";

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate
];

export const changePasswordValidator = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required')
    .custom(async (value, { req }) => {
      const user = await User.findById(req.user?._id);
      if (!user) throw new ApiError('User not found', 404);

      const isMatched = await bcrypt.compare(value, user.password);
      if (!isMatched) throw new ApiError('Current password is incorrect', 400);

      return true;
    }),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required'),
  validate
];