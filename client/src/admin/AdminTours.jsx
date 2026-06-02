import { useEffect, useState } from "react";

export default function AdminTours() {

    const [cities, setCities] = useState([]);
    const [tours, setTours] = useState([]);
    const [dates, setDates] = useState([]);

    const [selectedTourId, setSelectedTourId] = useState(null);
    const [editingTourId, setEditingTourId] = useState(null);
    const [editingDateId, setEditingDateId] = useState(null);

    const [tourForm, setTourForm] = useState({
        city_id: '',
        name: '',
        description: '',
        duration_days: ''
    });

    const [dateForm, setDateForm] = useState({
        start_date: '',
        end_date: '',
        price: '',
        total_slots: ''
    });

    useEffect(() => {
        fetchCities();
        fetchTours();
    }, []);

    async function fetchCities() {
        const res = await fetch('/api/cities');
        const data = await res.json();
        setCities(data.cities);
    }

    async function fetchTours() {
        const res = await fetch('/api/admin/tours');
        const data = await res.json();
        setTours(data.tours);
    }

    async function fetchDates(tourId) {
        const res = await fetch(`/api/tours/${tourId}/dates`);
        const data = await res.json();
        setDates(data.tour);
    }

    function handleTourChange(e) {
        setTourForm({
            ...tourForm,
            [e.target.name]: e.target.value
        });
    }

    function handleDateChange(e) {
        setDateForm({
            ...dateForm,
            [e.target.name]: e.target.value
        });
    }

    function resetTourForm() {
        setTourForm({
            city_id: '',
            name: '',
            description: '',
            duration_days: ''
        });
        setEditingTourId(null);
    }

    function resetDateForm() {
        setDateForm({
            start_date: '',
            end_date: '',
            price: '',
            total_slots: ''
        });
        setEditingDateId(null);
    }

    // ===== TOURS =====

    async function createTour() {
        await fetch('/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tourForm)
        });

        resetTourForm();
        fetchTours();
    }

    async function updateTour() {
        await fetch(`/api/tours/${editingTourId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tourForm)
        });

        resetTourForm();
        fetchTours();
    }

    function editTour(tour) {
        setEditingTourId(tour.id);
        setSelectedTourId(tour.id);

        setTourForm({
            city_id: tour.city_id,
            name: tour.name,
            description: tour.description,
            duration_days: tour.duration_days
        });

        fetchDates(tour.id);
    }

    function handleTourSubmit(e) {
        e.preventDefault();

        if (editingTourId) {
            updateTour();
        } else {
            createTour();
        }
    }

    // ===== DATES =====

    async function createDate() {

        await fetch(`/api/tours/${selectedTourId}/dates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dateForm)
        });

        resetDateForm();
        fetchDates(selectedTourId);
    }

    async function updateDate() {

        await fetch(`/api/tour-dates/${editingDateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dateForm)
        });

        resetDateForm();
        fetchDates(selectedTourId);
    }

    function editDate(date) {
        setEditingDateId(date.tourDateId);

        setDateForm({
            start_date: date.startDate,
            end_date: date.endDate,
            price: date.price,
            total_slots: date.total_slots
        });
    }

    async function updateTourStatus(id, is_active) {

        await fetch(`/api/tours/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_active
            })
        });

        fetchTours();
    }

    function handleDateSubmit(e) {
        e.preventDefault();

        if (!selectedTourId) return;

        if (editingDateId) {
            updateDate();
        } else {
            createDate();
        }
    }

    return (
        <div className="adminTours">

            <h1>Админка: Туры</h1>

            {/* ===== TOUR FORM ===== */}
            <form onSubmit={handleTourSubmit}>

                <select name="city_id" value={tourForm.city_id} onChange={handleTourChange}>
                    <option value="">Город</option>
                    {cities.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input name="name" placeholder="Название" value={tourForm.name} onChange={handleTourChange} />

                <textarea name="description" placeholder="Описание" value={tourForm.description} onChange={handleTourChange} />

                <input name="duration_days" type="number" placeholder="Дни" value={tourForm.duration_days} onChange={handleTourChange} />

                <button>
                    {editingTourId ? "Сохранить тур" : "Создать тур"}
                </button>

            </form>

            {/* ===== TOURS LIST ===== */}
            <h2>Список туров</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Город</th>
                        <th>Дней</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>

                <tbody>

                    {tours.map(tour => (

                        <tr key={tour.id}>

                            <td>{tour.id}</td>

                            <td>{tour.name}</td>

                            <td>{tour.cityName}</td>

                            <td>{tour.duration_days}</td>

                            <td>

                                <select
                                    value={tour.is_active}
                                    onChange={(e) =>
                                        updateTourStatus(
                                            tour.id,
                                            Number(e.target.value)
                                        )
                                    }
                                >

                                    <option value={1}>
                                        Активен
                                    </option>

                                    <option value={0}>
                                        Неактивен
                                    </option>

                                </select>

                            </td>

                            <td>

                                <button
                                    onClick={() => editTour(tour)}
                                >
                                    Открыть / Изменить
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>

            {selectedTourId && (
                <div>

                    <h2>Даты тура</h2>

                    <form onSubmit={handleDateSubmit}>

                        <input type="date" name="start_date" value={dateForm.start_date ? dateForm.start_date.split('T')[0] : ''} onChange={handleDateChange} />

                        <input type="date" name="end_date" value={dateForm.end_date ? dateForm.end_date.split('T')[0] : ''} onChange={handleDateChange} />

                        <input type="number" name="price" placeholder="Цена" value={dateForm.price} onChange={handleDateChange} />

                        <input type="number" name="total_slots" placeholder="Места" value={dateForm.total_slots} onChange={handleDateChange} />

                        <button>
                            {editingDateId ? "Сохранить дату" : "Добавить дату"}
                        </button>

                    </form>

                    <table>
                        <thead>
                            <tr>
                                <th>Начало</th>
                                <th>Конец</th>
                                <th>Цена</th>
                                <th>Места</th>
                                <th>Действие</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dates.map(d => {

                                const available = d.total_slots - d.booked_slots;

                                return (
                                    <tr key={d.tourDateId}>
                                        <td>{d.startDate}</td>
                                        <td>{d.endDate}</td>
                                        <td>{d.price}</td>
                                        <td>{available}</td>
                                        <td>
                                            <button onClick={() => editDate(d)}>
                                                Изменить
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            )}

        </div>
    );
}