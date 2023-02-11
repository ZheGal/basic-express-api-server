import { Router } from 'express';

const userRoutes = Router();

userRoutes.use((req, res, next) => {
  console.log('You have sent request to users routes!');
  next();
});

userRoutes.post('/login', (req, res) => {
  res.send('Login route');
});

userRoutes.post('/register', (req, res) => {
  res.send('Register route');
});

export { userRoutes };
