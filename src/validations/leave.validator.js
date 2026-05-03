import { body, check } from "express-validator";

import validate from "../middlewares/validate.middleware.js";
import ApiError from "../utils/apiError.js";

export const createLeaveValidator = [
  body('type')
    .notEmpty()
    .withMessage('Leave type is required')
    .isIn(['sick', 'casual', 'annual'])
    .withMessage('Leave type must be sick, casual or annual'),
  body('startDate')
    .notEmpty()
    .withMessage('Leave startDate is required')
    .isISO8601()
    .withMessage("Start date must be in format YYYY-MM-DD"),
  body('endDate')
    .notEmpty()
    .withMessage('Leave endDate is required')
    .isISO8601()
    .withMessage("End date must be in format YYYY-MM-DD")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new ApiError('Please select an end date after the start date', 400);
      }
      return true;
    }),
  body('reason')
    .notEmpty()
    .withMessage('Leave reason is required'),
  validate
];

export const updateLeaveStatusValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid leave id format'),
  body('status')
    .notEmpty()
    .withMessage('Leave status is required')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Leave type must be pending, approved or rejected'),
  validate
];
