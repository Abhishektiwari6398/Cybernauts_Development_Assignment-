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


// ---------- CORS configuration (fixed) ----------
// Use exact origin(s) WITHOUT trailing slash
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://cybernauts-development-assignment-a404.onrender.com';


const whitelist = [
FRONTEND_ORIGIN,
'http://localhost:3000', // optional for local dev
];


app.use(cors({
origin: function (origin, callback) {
// allow requests with no origin (like server-to-server or curl)
if (!origin) return callback(null, true);
if (whitelist.indexOf(origin) !== -1) {
callback(null, true);
} else {
callback(new Error('Not allowed by CORS'));
}
},
credentials: true,
}));


// ---------- Routes ----------
// Keep your routes mounted at /api/* as before
app.use('/api/users', userRoutes);
app.use('/api/graph', graphRoutes);


// Error handler
app.use(errorHandler);


// ---------- DB & export ----------
mongoose.connect(process.env.DB_URL!)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


export default app;
