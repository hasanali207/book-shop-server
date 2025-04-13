import { Request, Response } from 'express';
import Cart from './cart.model';
import { ProductModel } from '../product/product.model';
import { AuthRequest } from '../../auth/auth.middleware';

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user?.id });
    if (!cart) {
      cart = new Cart({ user: req.user?.id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user?.id }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', items: [] });
    }

    res.status(200).json({ message: 'Cart retrieved successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user?.id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user?.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
};
