import express from 'express';
import cors from 'cors';
import userRoutes from './src/user/user.js';
import tourRoutes from './src/tour/tour.js';
import cityRoutes from './src/city/city.js';
import db from './src/config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

// подключаем роуты
app.use(userRoutes);
app.use(tourRoutes);
app.use(cityRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "API работает" });
});

app.listen(5000, () => {
  console.log('Сервер запущен на http://localhost:5000');
});

console.log(db);