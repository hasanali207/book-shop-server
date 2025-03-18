import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';
import User from './user.model';
import config from '../../config';

const SECRET_KEY = config.jwt_secret || 'secretkey';

// REGISTER SERVICE
export const registerUser = async (userData: IUser) => {
  const { name, email, password, role = 'user' } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();

  return { message: 'User registered successfully' };
};

// LOGIN SERVICE
export const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: '1d',
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
