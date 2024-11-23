import express from 'express';
import { postSignup, getSignup, login } from '../controllers/userController.js';

const userRoutes = express.Router();

// POST route for signup (to create a new user)
userRoutes.post('/signup', postSignup);

// Optional GET route for signup (can be used for serving forms or basic information)
userRoutes.get('/signup', getSignup);

// POST route for login
userRoutes.post('/login', login);

export default userRoutes;
