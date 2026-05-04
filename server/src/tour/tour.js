import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/tours', async (req, res) => {
    const { name, countryId, description, durationDays } = req.body;

    try {
        const tour = await getActiveTours();
        const tourDates = await getTourDates(tour_id);
        const price = await getTourPrice(tour_id);

        return res.json({
            success: true,
            message: 'Туры получены',
            tour: {
                id: tour.id,
                name: tour.name,
                description: tour.description,
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
})

async function getActiveTours() {
    const query = 'SELECT * FROM tours WHERE is_active=1';
    const [rows] = await db.query(query);
    return rows;
}

async function getAllTours() {
    const query = 'SELECT * FROM tours';
    const [rows] = await db.query(query);
    return rows;
}

async function getTourDates(tour_id) {
    const query = 'SELECT start_date, end_date FROM tour_dates WHERE tour_id=?';
    const [rows] = await db.query(query, tour_id);
    return rows;
}

async function getTourPrice(tour_id) {
    const query = 'SELECT price FROM tour_dates WHERE tour_id=?';
    const [rows] = await db.query(query, tour_id);
    return rows;
}