import { Request, Response } from 'express';
import { loginUser, registerUser, } from './user.service';
import User from './user.model';

// REGISTER CONTROLLER
export const register = async (req: Request, res: Response) => {
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
    res.status(200).json(result); // Explicit 200 OK
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: 'Invalid email or password' }); // 401 Unauthorized
    } else {
      res.status(400).json({ message: error.message }); // Other bad requests
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
  
};






