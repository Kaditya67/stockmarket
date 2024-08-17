import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { email, username, phone, password1, password2 } = req.body;

    // Basic validation
    if (!email || !username || !phone || !password1 || !password2) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password1 !== password2) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password1, 10);

    // Create user
    const newUser = new User({ email, username, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};
