import { Schema, model } from 'mongoose';
import { Iorder } from './order.interface';

const orderSchema = new Schema<Iorder>(
  {
    email: { type: String, required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, required: true, default: 'Pending' },
    paymentIntentId: { type: String, required: true },
    status: { type: String, required: true, default: 'Processing' },
  },
  { timestamps: true },
);

export const OrderModel = model<Iorder>('Order', orderSchema);

