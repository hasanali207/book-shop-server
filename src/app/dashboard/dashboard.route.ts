import express from 'express';
import { adminMiddleware, authMiddleware } from '../auth/auth.middleware';

const router = express.Router();

router.get('/user', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to User Dashboard' });
});

router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

export default router;
