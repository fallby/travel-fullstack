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

export default router;