import { body } from "express-validator";

import validate from "../middlewares/validate.middleware.js";

export const updateMeValidator = [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('FirstName must be between 2 and 30 characters'),
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('LastName must be between 2 and 30 characters'),
  body('position')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Position must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  validate
];
