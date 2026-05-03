import express from 'express';
import cors from 'cors';
import userRoutes from './user/user.js';
import db from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

// подключаем роуты
app.use(userRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "API работает" });
});

app.listen(5000, () => {
  console.log('Сервер запущен на http://localhost:5000');
});

console.log(db);