import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import graphRoutes from './routes/graphRoutes';
import { errorHandler } from './utils/errorHandler';
import cors from 'cors';



const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cors({
  origin: 'https://cybernauts-development-assignment-a404.onrender.com/',
  credentials: true, 
}));


app.use('/api/users', userRoutes);
app.use('/api/graph', graphRoutes);

app.use(errorHandler);

mongoose.connect(process.env.DB_URL!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

export default app;
