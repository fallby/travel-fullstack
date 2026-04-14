const express = require('express');
const router = express.Router();

const db = require('../config/db.js');
const bcrypt = require('bcrypt');

router.post('/api/registration', async (req, res) => {
    const { name, surname, email, password } = req.body;

    try { 
        const user = await getUserByEmail(email); 

        if (user.length > 0) { 
            return res.json({ 
                success: false, 
                error: 'Пользователь уже зарегистрирован' 
            }); 
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(name, surname, email, hashedPassword); 

        return res.json({ 
            success: true, 
            message: 'Пользователь зарегистрирован' 
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
            return res.json({ 
                success: false, 
                error: 'Пользователь не найден' 
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

        return res.json({
            success: true,
            message: 'Вход выполнен',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
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

function createUser(name, surname, email, password) {
    const query = 'INSERT INTO users(name, surname, email, password) VALUES(?,?,?,?)';
    return db.query(query, [name, surname, email, password]);
}