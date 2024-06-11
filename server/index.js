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

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(route);
app.use(cookieParser());

app.use(async (req, res, next) => {
  const loginToken = req.cookies['login_token'];
  console.log('login_token', loginToken);

  req.user = {
      id: -1,
  };

  if (!loginToken) {
      return next();
  }

  try {
      const selectQuery = `SELECT * FROM login_token WHERE token = ?`;
      const [dbResponse] = await connection.execute(selectQuery, [loginToken]);

      if (dbResponse.length !== 1) {
          return next();
      }

      const tokenObj = dbResponse[0];
      req.user.id = tokenObj.userId;
  } catch (error) {
      console.error(error);
  }

  return next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
