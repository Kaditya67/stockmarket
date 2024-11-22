import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token format

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
