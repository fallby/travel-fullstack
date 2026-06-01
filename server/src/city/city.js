import express from 'express';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/cities', async (req, res) => {

    try {
        const cities = await getAllCities();

        return res.json({
            success: true,
            message: 'Города получены',
            cities: cities
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
})

router.get('/api/cities/:id', async (req, res) => {

    try {
        const city = await getCityById(req.params.id);

         if (!city) {
            return res.status(404).json({
                error: 'Город не найден'
            });
        }

        return res.json({
            success: true,
            message: 'Город получен',
            city: city
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
})

router.post('/api/cities', async (req, res) => {

    try {
        const { name, description } = req.body;

        await createCity(name, description);

        return res.json({
            success: true,
            message: 'Город создан'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }

});

router.put('/api/cities/:id', async (req, res) => {

    try {
        const { name, description } = req.body;

        await updateCity(
            req.params.id,
            name,
            description
        );

        return res.json({
            success: true,
            message: 'Город обновлён'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }

});

async function getAllCities() {
    const query = 'SELECT * FROM cities';
    const [rows] = await db.query(query);
    return rows;
}

async function getCityById(id) {
    const query = 'SELECT * FROM cities WHERE id=?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
}

async function createCity(name, description) {
    const query = 'INSERT INTO cities (name, description) VALUES (?, ?)';
    const [result] = await db.query(query, [name, description]);
    return result;
}

async function updateCity(id, name, description) {
    const query = 'UPDATE cities SET name = ?, description = ? WHERE id = ?';
    const [result] = await db.query(query, [name, description, id]);
    return result;
}

export default router;