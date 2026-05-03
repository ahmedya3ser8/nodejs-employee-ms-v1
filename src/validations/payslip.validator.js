import { body, check } from "express-validator";

import validate from "../middlewares/validate.middleware.js";

export const createPayslipValidator = [
  body('month')
    .notEmpty()
    .withMessage('Month is required')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be between 1 and 12'),
  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({ min: 2000 })
    .withMessage('Year must be valid'),
  body('basicSalary')
    .notEmpty()
    .withMessage('Basic salary is required')
    .isFloat({ min: 0 })
    .withMessage('Basic salary must be a positive number'),
  body('allowances')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Allowances must be a positive number'),
  body('deductions')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Deductions must be a positive number'),
  body('employee')
    .notEmpty()
    .withMessage('Employee is required')
    .isMongoId()
    .withMessage('Invalid employee id'),
  validate
];

export const getPayslipValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid payslip id format'),
  validate
];
