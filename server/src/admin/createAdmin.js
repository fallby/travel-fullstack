import bcrypt from 'bcrypt';
import db from '../config/db.js';

const password = await bcrypt.hash('admin1111', 10);

await db.query(
  'INSERT INTO users (name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)',
  ['admin', 'first', 'admin@gmail.com', password, 'admin']
);

console.log('Admin created');