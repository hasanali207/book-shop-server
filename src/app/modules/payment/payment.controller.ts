import { Request, Response } from 'express';
import { confirmPayment, createPaymentIntent } from './payment.service';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { userId, amount, currency } = req.body;
    const clientSecret = await createPaymentIntent(userId, amount, currency);
    res.status(200).json({ clientSecret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body;
    const status = await confirmPayment(paymentIntentId);
    res.status(200).json({ status });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
