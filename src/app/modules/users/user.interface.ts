export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  shippingAddress?: string,
  role: 'user' | 'admin';
}
