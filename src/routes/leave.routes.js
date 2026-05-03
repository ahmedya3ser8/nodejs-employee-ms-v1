import express from 'express';

import { 
  createLeave, 
  getLeaves,
  getMyLeaves,
  getLeaveStats,
  updateLeaveStatus 
} from '../controllers/leave.controller.js';
import { 
  createLeaveValidator, 
  updateLeaveStatusValidator 
} from '../validations/leave.validator.js';

import authorizeRoles from '../middlewares/role.middleware.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorizeRoles('admin'), getLeaves)
  .post(createLeaveValidator, createLeave)

router.get('/me', getMyLeaves);
router.get('/stats', getLeaveStats);

router.patch('/:id', updateLeaveStatusValidator, authorizeRoles('admin'), updateLeaveStatus);

export default router;
