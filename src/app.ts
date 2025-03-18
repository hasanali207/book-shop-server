import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './app/auth/auth.route';


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

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Stationary shop');
});

export default app;
