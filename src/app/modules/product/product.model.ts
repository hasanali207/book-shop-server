import mongoose, { Schema } from 'mongoose';
import { ProductCategory, IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    imgURL: { type: String },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
