import express from 'express';
import userRouter from './routes/userRoute.js';
import commentRouter from './routes/commentRoute.js';
import postRouter from './routes/postRoute.js';
import connectDB from './config/mongodb.js';
import webhookRouter from './routes/webhookRoute.js';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        'https://blog-mtrs.onrender.com/', // Your Render frontend URL
        process.env.FRONTEND_URL, // For local testing (optional)
    ],
    credentials: true
}));

app.use(clerkMiddleware());

app.use('/webhooks', webhookRouter);
const port = process.env.PORT || 5000;

app.use(express.json());


app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/posts', postRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack
    });
});


const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
};
startServer();