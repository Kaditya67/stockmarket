import express from 'express';
import { getStocks } from '../controllers/stockController.js';

const router = express.Router();

// Define your routes here
router.get('/stocks', getStocks);

export default router;
