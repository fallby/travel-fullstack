import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',       
  password: '1111', 
  database: 'travel_db' 
});

// db.connect((err) => {
//   if (err) {
//     console.error('Ошибка подключения к базе данных:', err);
//     return;
//   }
//   console.log('Подключено к MySQL!');
// });

export default db;

