// Modules

import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// Routes

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

// Settings

app.set('PORT', process.env.PORT || 4000);

app.use(cors());

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);

export default app;