import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/registration', async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Пользователь уже зарегистрирован"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(name, surname, email, hashedPassword, 'user');

        const newUser = await getUserByEmail(email);
        const createdUser = newUser[0];

        const token = jwt.sign(
            {
                id: createdUser.id,
                email: createdUser.email,
                role: createdUser.role
            },
            'secret_key',
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            message: 'Пользователь зарегистрирован',
            access_token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});


router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await getUserByEmail(email);

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Пользователь не найден" 
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                error: 'Неверный пароль'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            'secret_key',
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            message: 'Вход выполнен',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            access_token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

async function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=?';
    const [rows] = await db.query(query, [email]);
    return rows;
}

async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const [rows] = await db.query(query);
    console.log(rows);
    return rows;
}

function createUser(name, surname, email, password, role) {
    const query = 'INSERT INTO users(name, surname, email, password, role) VALUES(?,?,?,?,?)';
    return db.query(query, [name, surname, email, password, role]);
}

export default router;