import express from 'express';
import { authMiddleware } from '../../auth/auth.middleware';
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from './cart.controller';

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.delete('/remove/:productId', authMiddleware, removeFromCart);
router.get('/', authMiddleware, getCart);
router.delete('/clear', authMiddleware, clearCart);

export default router;