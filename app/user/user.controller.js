import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

import { UserFields } from '../utils/user.utils.js';

// Experimental:

// import { PostFields } from '../utils/post.utils.js';

// @desc     Get users profile
// @route    GET /api/user
// @access   Public

export const getUsersProfile = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        orderBy: {
            id: 'desc'
        },
        select: UserFields
    });

    res.json(users);
});

// @desc     Get profile
// @route    GET /api/user/profile
// @access   Private

export const getProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        select: UserFields
    });

    res.json(user);
});

// @desc     Get user profile
// @route    GET /api/user/:id
// @access   Private

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +req.params.id
        },
        select: UserFields
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
});

// @desc     Delete user profile
// @route    DELETE /api/user/:id
// @access   Private

export const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: +req.params.id
            },
            select: UserFields
        });

        console.log(`Delete user: ${user.username}`);
        res.json({ message: 'Delete user' });
    } catch(error) {
        res.status(404);
        throw new Error('User not found');
    }
});

// Experimental:

// @desc     Get profile posts
// @route    GET /api/user/profile/post
// @access   Private

// export const getProfilePosts = asyncHandler(async (req, res) => {
//     const posts = await prisma.user.findUnique({
//         where: {
//             id: req.user.id
//         },
//         select: UserFields
//     })
//     .posts();

//     res.json(posts);
// });

// export const getProfilePosts = asyncHandler(async (req, res) => {
//     const posts = await prisma.post.findMany({
//         where: {
//             author: {
//                 id: req.user.id
//             }
//         },
//         select: PostFields
//     });

//     res.json(posts);
// });

// export const getProfileWithPosts = asyncHandler(async (req, res) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: req.user.id
//         },
//         select: {
//             ...UserFields,
//             posts: true
//         }
//     });

//     res.json(user);
// });

// @desc     Get user posts
// @route    GET /api/user/:id/post
// @access   Private

// export const getUserPosts = asyncHandler(async (req, res) => {
//     const posts = await prisma.user.findUnique({
//         where: {
//             id: +req.params.id
//         },
//         select: {
//             ...UserFields,
//             posts: true
//         }
//     });

//     res.json(posts);
// });
