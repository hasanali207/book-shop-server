import { Request, Response } from 'express';
import { loginUser, registerUser } from './user.service';
import User from './user.model';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

//Update user
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { name, shippingAddress, image } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, shippingAddress, image },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
