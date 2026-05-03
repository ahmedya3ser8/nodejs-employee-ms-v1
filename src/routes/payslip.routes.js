import express from 'express';

import { 
  createPayslip, 
  getMyPayslips, 
  getPayslip, 
  getPayslips 
} from '../controllers/payslip.controller.js';
import { 
  createPayslipValidator, 
  getPayslipValidator
} from '../validations/payslip.validator.js';

import protect from '../middlewares/auth.middleware.js';
import authorizeRoles from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorizeRoles('admin'), getPayslips)
  .post(createPayslipValidator, createPayslip);

router.get('/me', getMyPayslips);
router.get('/:id', getPayslipValidator, getPayslip);

export default router;
