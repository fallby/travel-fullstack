import express from 'express';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/tours', async (req, res) => {

    try {
        const tours = await getInformationAboutTours();

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

router.get('/api/tours/:id', async (req, res) => {

    try {
        const tour = await getTourById(req.params.id);

        return res.json({
            success: true,
            message: 'Тур получен',
            tour: tour
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
})

router.get('/api/tours/:id/dates', async (req, res) => {

    try {
        const tourInformation = await getTourDatePriceSlotsById(req.params.id);

        return res.json({
            success: true,
            message: 'Тур получен',
            tour: tourInformation  
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
})

router.post('/api/tours', async (req, res) => {
    const { city_id, name, description, duration_days } = req.body;

    try {
        await createTour(
            city_id,
            name,
            description,
            duration_days
        );

        return res.json({
            success: true,
            message: 'Тур создан'
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

router.put('/api/tours/:id', async (req, res) => {
    const { city_id, name, description, duration_days } = req.body;

    try {
        await updateTour(
            req.params.id,
            city_id,
            name,
            description,
            duration_days
        );

        return res.json({
            success: true,
            message: 'Тур обновлён'
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

router.post('/api/tours/:id/dates', async (req, res) => {

    const {
        start_date,
        end_date,
        price,
        total_slots
    } = req.body;

    try {

        await createTourDate(
            req.params.id,
            start_date,
            end_date,
            price,
            total_slots
        );

        return res.json({
            success: true,
            message: 'Дата добавлена'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });

    }
});

router.put('/api/tour-dates/:id', async (req, res) => {

    const {
        start_date,
        end_date,
        price,
        total_slots
    } = req.body;

    try {

        await updateTourDate(
            req.params.id,
            start_date,
            end_date,
            price,
            total_slots
        );

        return res.json({
            success: true,
            message: 'Дата обновлена'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });

    }
});

router.patch('/api/tours/:id/status', async (req, res) => {

    const { id } = req.params;
    const { is_active } = req.body;

    try {

        await updateTourStatus(id, is_active);

        return res.json({
            success: true,
            message: 'Статус обновлён'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

router.get('/api/admin/tours', async (req, res) => {

    try {

        const tours = await getAllToursForAdmin();

        return res.json({
            success: true,
            tours
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

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

async function getInformationAboutTours() {
    const query = 'SELECT t.id, t.name, t.description, t.duration_days, c.name AS cityName, MIN(td.price) AS minPrice FROM tours t JOIN cities c ON c.id = t.city_id LEFT JOIN tour_dates td ON td.tour_id = t.id WHERE t.is_active = 1 GROUP BY t.id';
    const [rows] = await db.query(query);
    return rows;
}

async function getAllInformationAboutTours() {
    const query = 'SELECT t.id, t.city_id, c.name AS cityName, t.name AS tourName, t.description, t.duration_days, td.start_date AS startDate, td.end_date AS endDate, td.price, td.total_slots, td.booked_slots FROM cities c INNER JOIN tours t ON c.id=t.city_id INNER JOIN tour_dates td ON t.id=td.tour_id WHERE t.is_active=1';
    const [rows] = await db.query(query);
    return rows;
}

async function getTourById(id) {
    const query = 'SELECT t.id, c.name AS cityName, t.name AS tourName, t.description, t.duration_days FROM cities c INNER JOIN tours t ON c.id=t.city_id WHERE t.is_active=1 AND t.id=?';
    const [rows] = await db.query(query, [id]);
    return rows;
}

async function getTourDatePriceSlotsById(id) {
    const query = 'SELECT td.id AS tourDateId, td.start_date AS startDate, td.end_date AS endDate, td.price, td.total_slots, td.booked_slots FROM tours t INNER JOIN tour_dates td ON t.id = td.tour_id WHERE t.is_active = 1 AND t.id = ? ORDER BY td.start_date';
    const [rows] = await db.query(query, [id]);
    return rows;
}

async function createTour(city_id, name, description, duration_days) {
    const query ='INSERT INTO tours (city_id, name, description, duration_days, is_active) VALUES (?, ?, ?, ?, 1)';
    const [result] = await db.query(query, [city_id, name, description, duration_days]);
    return result;
}

async function updateTour(id, city_id, name, description, duration_days) {
    const query = 'UPDATE tours SET city_id=?, name=?, description=?, duration_days=? WHERE id=?';
    const [result] = await db.query(query, [city_id, name, description, duration_days, id]);
    return result;
}

async function createTourDate(tour_id, start_date, end_date, price, total_slots) {
    const query = 'INSERT INTO tour_dates (tour_id, start_date, end_date, price, total_slots, booked_slots) VALUES (?, ?, ?, ?, ?, 0)';
    const [result] = await db.query(query, [tour_id, start_date, end_date, price, total_slots]);
    return result;
}

async function updateTourDate(id, start_date, end_date, price, total_slots) {
    const query = 'UPDATE tour_dates SET start_date=?, end_date=?, price=?, total_slots=? WHERE id=?';
    const [result] = await db.query(query, [start_date, end_date, price, total_slots, id]);
    return result;
}

async function updateTourStatus(id, is_active) {
    const query = 'UPDATE tours SET is_active=? WHERE id=?';
    const [result] = await db.query(query, [is_active, id]);
    return result;
}

async function getAllToursForAdmin() {
    const query = 'SELECT t.id, t.name, t.description, t.duration_days, t.is_active, c.name AS cityName, MIN(td.price) AS minPrice FROM tours t JOIN cities c ON c.id = t.city_id LEFT JOIN tour_dates td ON td.tour_id = t.id GROUP BY t.id, t.name, t.description, t.duration_days, t.is_active, c.name ORDER BY t.id ASC;';
    const [rows] = await db.query(query);
    return rows;
}

export default router;