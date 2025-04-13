import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending',
    },
    paymentIntentId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Payment = mongoose.model('Payment', PaymentSchema);
