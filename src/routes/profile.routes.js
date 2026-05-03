import express from 'express';

import {
  getProfile,
  updateProfile
} from '../controllers/profile.controller.js';
import protect from '../middlewares/auth.middleware.js';
import { updateMeValidator } from '../validations/profile.validator.js'; 

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProfile)
  .patch(updateMeValidator, updateProfile)

export default router;
