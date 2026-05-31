

async function bookTour(tour_date_id, user_id, name, phone, comment, status) {
    const query = 'INSERT INTO requests (tour_date_id, user_id, name, phone, comment, status) VALUES (?, ?, ?, ?, ?, ?)';
    return db.query(query, [tour_date_id, user_id, name, phone, comment, status]);
}