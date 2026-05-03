import express from 'express';

import {
  login,
  logout,
  getMe,
  changePassword
} from '../controllers/auth.controller.js';
import protect from '../middlewares/auth.middleware.js';
import { changePasswordValidator, loginValidator } from '../validations/auth.validator..js';

const router = express.Router();

router.post('/login', loginValidator, login);
router.post('/logout', logout);

router.get('/getMe', protect, getMe);

router.patch('/changePassword', protect, changePasswordValidator, changePassword);

export default router;
