import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './app/auth/auth.route';
import dashBoardRoutes from './app/dashboard/dashboard.route';
import userRoutes from './app/modules/users/user.Route';
import productRoutes from './app/modules/product/product.route';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Application routes

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashBoardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Stationary shop');
});

export default app;
