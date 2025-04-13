import { Types } from 'mongoose';

// export interface Iorder {
//   email: string;
//   product: Types.ObjectId;
//   quantity: number;
//   totalPrice: number;
//   status?: string
// }
export interface Iorder {
  email: string;
  products: {
    product: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  paymentStatus: string;
  paymentIntentId: string;
  status?: string;
}
