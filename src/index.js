import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import healthDataRoutes from './routes/healthData.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/users', userRoutes);
app.use('/health', healthDataRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const db = 'Health_Prediction_App';
mongoose.connect(`mongodb+srv://****:*******@*********.mongodb.net/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

export default app;
