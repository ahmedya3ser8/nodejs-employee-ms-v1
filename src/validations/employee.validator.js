import { body, check } from "express-validator";

import validate from "../middlewares/validate.middleware.js";
import { DEPARTMENTS } from "../constants/department.js";

export const getEmployeeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid employee id format'),
  validate
];

export const createEmployeeValidator = [
  body('firstName')
    .notEmpty()
    .withMessage('FirstName is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('FirstName must be between 2 and 30 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('LastName is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('LastName must be between 2 and 30 characters'),
  body('position')
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Position must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .isIn(DEPARTMENTS)
    .withMessage('Invalid department'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('PhoneNumber is required')
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage('PhoneNumber must start with 010, 011, 012, or 015 and be 11 digits'),
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
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'employee'])
    .withMessage('Role must be admin or employee'),
  validate
];

export const updateEmployeeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid employee id format'),
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
  body('department')
    .optional()
    .isIn(DEPARTMENTS)
    .withMessage('Invalid department'),
  body('phoneNumber')
    .optional()
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage('PhoneNumber must start with 010, 011, 012, or 015 and be 11 digits'),
  body('basicSalary')
    .optional()
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
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'employee'])
    .withMessage('Role must be admin or employee'),
  validate
];

export const deleteEmployeeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid employee id format'),
  validate
];
