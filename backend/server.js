import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stock.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/users', userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Connect to MongoDB
connectToMongoDb().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
