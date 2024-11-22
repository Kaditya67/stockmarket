import express from 'express';
import { signup, getProfile, updateProfile, deleteAccount } from '../controllers/ProfileUserController.js';

import { protectRoute } from '../middleware/authmiddleware.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Profile-related routes (protected by auth middleware)
router.get('/profile', protectRoute, getProfile);
router.put('/profile', protectRoute, updateProfile);
router.delete('/delete', protectRoute, deleteAccount);

export default router;
