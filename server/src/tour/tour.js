import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/tours', async (req, res) => {

    try {
        const tours = await getAllInformationAboutTours();

        return res.json({
            success: true,
            message: 'Туры получены',
            tours: tours
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

async function getCountryById(id) {
    const query = 'SELECT name FROM cities WHERE id=?';
    const [rows] = await db.query(query, id);
    return rows;
}

async function allInformationAboutTours() {
    const query = 'SELECT c.name, t.id, t.name, t.description FROM cities c INNER JOIN tours t ON c.id=t.city_id';
    const [rows] = await db.query(query);
    return rows;
}

async function getAllInformationAboutTours() {
    const query = 'SELECT c.name AS cityName, t.name AS tourName, t.description, t.duration, td.start_date AS startDate, td.end_date AS endDate, td.price, td.total_slots, td.booked_slots FROM cities c INNER JOIN tours t ON c.id=t.city_id INNER JOIN tour_dates td ON t.id=td.tour_id WHERE t.is_active=1';
    const [rows] = await db.query(query);
    return rows;
}


