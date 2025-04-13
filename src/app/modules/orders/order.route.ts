import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// Create an order
router.post('/', OrderController.createOrder);

// Fetch all orders
router.get('/', OrderController.getAllOrders);

// Fetch orders by id
router.get('/:orderId', OrderController.getOrderById);

// Update order status
router.patch('/:orderId', OrderController.updateOrderStatus);

// Delete an order
router.delete('/:orderId', OrderController.deleteOrder);

// Calculate revenue
router.get('/revenue', OrderController.calculateRevenue);

export const OrderRoutes = router;
