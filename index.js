import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './app/auth/auth.routes.js';
import userRoutes from './app/user/user.routes.js';
import postRoutes from './app/post/post.routes.js';

import { cors } from './app/middleware/cors.middleware.js';
import { notFound, errorHandler } from './app/middleware/error.middleware.js';

import { prisma } from './app/prisma.js';

dotenv.config();

const app = express();

async function main() {
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    app.use(cors);

    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/post', postRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(
        PORT,
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
