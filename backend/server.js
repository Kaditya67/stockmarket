import express from 'express';
import dotenv from 'dotenv';
import stockRoutes from './routes/stock.js';
import connectToMongoDb from './db/connectToMongoDb.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongoDb
connectToMongoDb();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes);

// Start the server
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
