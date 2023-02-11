import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT} port`);
});
