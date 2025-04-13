import express from 'express';
import { confirmPaymentStatus, createPayment } from './payment.controller';

const router = express.Router();

router.post('/create-payment-intent', createPayment);
router.post('/confirm-payment', confirmPaymentStatus);

export default router;
