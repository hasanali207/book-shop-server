import mongoose, { Schema } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Novel', 'Drama', 'History', 'Poetry', 'Religious'], // Ensure only valid categories are accepted
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const bookModel = mongoose.model<TBook>('Book', bookSchema);
