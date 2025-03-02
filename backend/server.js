import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import { connectDB } from './db/db.js';
import userRoutes from './routes/user.route.js';
import predictRoutes from './routes/predict.route.js';
import resulttRoutes from './routes/result.route.js';

const app = express();
const PORT = 5000;

dotenv.config();

app.use(
    cors({
      origin: "http://localhost:5173", // Explicitly allow frontend URL
      credentials: true, // Allow cookies and authentication headers
    })
  );

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/predict',predictRoutes);
app.use('/api/v1/result',resulttRoutes);




app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
