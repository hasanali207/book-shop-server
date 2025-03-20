import express, { RequestHandler } from 'express';
import { authMiddleware, adminMiddleware } from '../auth/auth.middleware';

const router = express.Router();

router.get('/user', authMiddleware as RequestHandler, (req, res) => {
  res.json({ message: 'Welcome to User Dashboard' });
});

router.get(
  '/admin',
  authMiddleware as RequestHandler,
  adminMiddleware as RequestHandler,
  (req, res) => {
    res.json({ message: 'Welcome to Admin Dashboard' });
  },
);

export default router;
