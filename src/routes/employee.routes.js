import express from 'express';

import { 
  createEmployee, 
  deleteEmployee, 
  getEmployee, 
  getEmployees, 
  updateEmployee 
} from '../controllers/employee.controller.js';
import { 
  createEmployeeValidator, 
  deleteEmployeeValidator, 
  getEmployeeValidator, 
  updateEmployeeValidator 
} from '../validations/employee.validator.js';
import protect from '../middlewares/auth.middleware.js';
import authorizeRoles from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorizeRoles('admin', 'employee'), getEmployees)
  .post(authorizeRoles('admin'), createEmployeeValidator, createEmployee)

router.route('/:id')
  .get(authorizeRoles('admin'), getEmployeeValidator, getEmployee)
  .patch(authorizeRoles('admin'), updateEmployeeValidator, updateEmployee)
  .delete(authorizeRoles('admin'), deleteEmployeeValidator, deleteEmployee)

export default router;
