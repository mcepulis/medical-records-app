import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3555, () => {
  console.log('http://localhost:3555');
});
