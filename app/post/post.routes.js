import express from 'express';

import {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
} from './post.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(getPosts)
    .post(protect, createPost);

router
    .route('/:id')
    .get(protect, getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

export default router;
