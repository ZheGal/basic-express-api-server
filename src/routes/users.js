import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/login', (req, res) => {
  res.send('Login route');
});

userRoutes.post('/register', (req, res) => {
  res.send('Register route');
});

export { userRoutes };
