import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

