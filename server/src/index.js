const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({"message": "API работает "});
});

app.listen(5000, () => {
  console.log('Сервер запущен на http://localhost:5000');
});