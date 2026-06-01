import express from 'express';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/bookings', async (req, res) => {
    const { tour_date_id, user_id, name, phone, comment } = req.body;

    try {
        const tourDate = await getTourDateById(tour_date_id);

        if (!tourDate) {
            return res.status(404).json({
                success: false,
                error: 'Дата тура не найдена'
            });
        }

        const availableSlots = tourDate.total_slots - tourDate.booked_slots;

        if (availableSlots <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Свободных мест нет'
            });
        }

        await bookTour(tour_date_id, user_id, name, phone, comment);

        await incrementBookedSlots(tour_date_id);

        return res.json({
            success: true,
            message: 'Бронирование успешно создано'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }

});

router.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await getBookings();

        return res.json({
            success: true,
            message: 'Бронирования получены',
            bookings
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

router.patch('/api/bookings/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const allowedStatuses = ['new', 'contacted', 'confirmed', 'cancelled'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Некорректный статус'
            });
        }

        await updateBookingStatus(id, status);

        return res.json({
            success: true,
            message: 'Статус обновлён'
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: 'Ошибка сервера'
        });
    }
});

async function bookTour(tour_date_id, user_id, name, phone, comment) {
    const query = 'INSERT INTO bookings (tour_date_id, user_id, name, phone, comment) VALUES (?, ?, ?, ?, ?)';
    return db.query(query, [tour_date_id, user_id, name, phone, comment]);
}

async function getTourDateById(id) {
    const query = 'SELECT * FROM tour_dates WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
}

async function incrementBookedSlots(tour_date_id) {
    const query = 'UPDATE tour_dates SET booked_slots = booked_slots + 1 WHERE id = ?';
    const [result] = await db.query(query, [tour_date_id]);
    return result;
}

async function getBookings() {
    const query = 'SELECT b.id, b.name, b.phone, b.comment, b.status, b.created_at, t.name AS tourName, td.start_date AS startDate, td.end_date AS endDate FROM bookings b INNER JOIN tour_dates td ON b.tour_date_id = td.id INNER JOIN tours t ON td.tour_id = t.id ORDER BY b.created_at DESC';
    const [rows] = await db.query(query);
    return rows;
}

async function updateBookingStatus(id, status) {
    const query = 'UPDATE bookings SET status = ? WHERE id = ?';
    const [result] = await db.query(query, [status, id]);
    return result;
}

export default router;