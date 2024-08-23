// routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users/register
router.post('/signup', registerUser);

export default router;