import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const SECRET_KEY = config.jwt_secret || 'secretkey';

// Define the structure of JWT payload
interface DecodedUser extends JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

// Extend Request type to include `user`
export interface AuthRequest extends Request {
  user?: DecodedUser;
}

// Authentication Middleware
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedUser;
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

// Admin Middleware (Only Admins Can Access)
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Admins Only.' });
  }
  next();
};
