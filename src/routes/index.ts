import { Request, Response, Router } from 'express';
import { userRoutes } from './users';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/hello/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Your id is "${id}"`);
});

router.use('/users', userRoutes);

export { router };
