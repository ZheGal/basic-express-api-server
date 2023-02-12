import { NextFunction, Request, Response, Router } from 'express';

const userRoutes = Router();

userRoutes.use((req: Request, res: Response, next: NextFunction) => {
  console.log('You have sent request to users routes!');
  next();
});

userRoutes.post('/login', (req: Request, res: Response) => {
  res.send('Login route');
});

userRoutes.post('/register', (req: Request, res: Response) => {
  res.send('Register route');
});

export { userRoutes };
