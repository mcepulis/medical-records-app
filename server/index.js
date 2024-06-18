import express from 'express';
import cors from 'cors';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import route from './router/route.js';
import cookieParser from 'cookie-parser';

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

app.use(cors({
  origin: 'http://localhost:3666',
  credentials: true,
}));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ message: 'Invalid JSON' });
  }
  next();
});

app.use(async (req, res, next) => {
  const loginToken = req.cookies['login_token'];

  req.user = {
      id: -1,
  };

  if (!loginToken) {
      return next();
  }

  try {
      const connection = await dbase();
      const selectQuery = `SELECT * FROM login_token WHERE token = ?`;
      const [dbResponse] = await connection.execute(selectQuery, [loginToken]);

      if (dbResponse.length !== 1) {
          return next();
      }

      const tokenObj = dbResponse[0];
      req.user.id = tokenObj.user_id;
  } catch (error) {
      console.error('Error retrieving user from login_token:', error);
  }

  return next();
});
app.use(route);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
