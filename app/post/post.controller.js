import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

import { PostFields } from '../utils/post.utils.js';

// @desc     Get posts
// @route    GET /api/post
// @access   Public

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            id: 'desc'
        },
        select: {
            author: {
                select: {
                    username: true
                }
            },
            ...PostFields
        }
    });

    res.json(posts);
});

// @desc     Get post
// @route    GET /api/post/:id
// @access   Private

export const getPost = asyncHandler(async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: +req.params.id
        },
        select: PostFields
    });

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.json(post);
});

// @desc     Create post
// @route    POST /api/post
// @access   Private

export const createPost = asyncHandler(async (req, res) => {
    const { title, text } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            text,
            authorId: req.user.id
        },
        select: {
            author: {
                select: {
                    username: true
                }
            },
            ...PostFields
        }
    });

    res.json(post);
});

// @desc     Update post
// @route    PUT /api/post/:id
// @access   Private

export const updatePost = asyncHandler(async (req, res) => {
    const { title, text } = req.body;

    try {
        const post = await prisma.post.update({
            where: {
                id: +req.params.id
            },
            data: {
                title,
                text,
                authorId: req.user.id
            },
            select: PostFields
        });

        res.json(post);
    } catch (error) {
        res.status(404);
        throw new Error('Post not found');
    }
});

// @desc     Delete post
// @route    DELETE /api/post/:id
// @access   Private

export const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: +req.params.id
            },
            select: PostFields
        });

        res.json({ message: 'Delete post' });
    } catch (error) {
        res.status(404);
        throw new Error('Post not found');
    }
});
