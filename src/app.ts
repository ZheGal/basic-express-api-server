import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { router } from './routes';
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();


app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/hello/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`Your id is "${id}"`);
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT} port`);
});
