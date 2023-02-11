import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.get('/hello/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Your id is "${id}"`);
})

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT} port`);
});
