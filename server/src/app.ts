import express from 'express';
import mongoose, { MongooseError } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { sessionMiddleware } from './config/session';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use('/auth', userRoutes);
app.use('/api', taskRoutes);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: MongooseError) => {
    console.error('Failed to connect to MongoDB', err);
  });
