import express from 'express';

import {
    authUser,
    registerUser,
    updateUser
} from './auth.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
    .route('/login')
    .post(authUser);

router
    .route('/register')
    .post(registerUser);

router
    .route('/update')
    .put(protect, updateUser);

export default router;
