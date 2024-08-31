import express from 'express';

import {
    getProfile,
    getUsersProfile,
    getUserProfile,
    deleteUserProfile
    // getProfileWithPosts
    // getUserPosts
} from './user.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(getUsersProfile);

router
    .route('/profile')
    .get(protect, getProfile);

router
    .route('/:id')
    .get(protect, getUserProfile)
    .delete(protect, deleteUserProfile);

// Experimantal:

// router
//     .route('/profile/post')
//     .get(protect, getProfileWithPosts);

// router
//     .route('/:id/post')
//     .get(protect, getUserPosts);

export default router;
