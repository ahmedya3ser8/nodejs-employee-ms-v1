import express from 'express';

import protect from '../middlewares/auth.middleware.js';
import authorizeRoles from '../middlewares/role.middleware.js';

import { 
  getAdminDashboard, 
  getEmployeeDashboard 
} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.use(protect);

router.get('/admin', authorizeRoles('admin'), getAdminDashboard);
router.get('/employee', authorizeRoles('employee'), getEmployeeDashboard);

export default router;
