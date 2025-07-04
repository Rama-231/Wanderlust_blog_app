// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Core dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

// Custom modules
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware: CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://13.51.156.58:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middleware: Request parsing and compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// ✅ Connect to MongoDB
connectDB();

// ✅ API routes
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Yay! Backend of Wanderlust app is now accessible.');
});

// ✅ Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${port}`);
});

export default app;

