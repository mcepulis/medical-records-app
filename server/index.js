import express from 'express';
import cors from 'cors';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import route from './router/route.js';

const app = express();
const PORT = 3555;

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3666",
};

const helmetOptions = {
  crossOriginResourcePolicy: false,
};

export async function dbase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medical',
  });
  await connection.query("USE medical");
  return connection;
}

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(route);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
