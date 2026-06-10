import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Booking.css";

export default function Booking() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState({});
    const [serverError, setServerError] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [tour, setTour] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        comment: '',
        tour_date_id: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [tourRes, datesRes] = await Promise.all([
                    fetch(`/api/tours/${id}`),
                    fetch(`/api/tours/${id}/dates`)
                ]);

                const tourData = await tourRes.json();
                const datesData = await datesRes.json();

                setTour(tourData.tour[0]);
                setSchedule(datesData.tour);

            } catch (err) {
                setServerError("Ошибка загрузки данных");
            }
        }

        fetchData();
    }, [id]);

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function validate(form) {
        let errors = {};

        if (!form.name.trim()) errors.name = 'Введите имя';
        if (!form.phone.trim()) errors.phone = 'Введите телефон';
        if (!form.tour_date_id) errors.tour_date_id = 'Выберите дату';

        return errors;
    }

    async function bookingRequest(form) {

        setIsLoading(true);

        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const data = await response.json();

        setIsLoading(false);

        if (!response.ok) {
            setServerError(data.error || 'Ошибка бронирования');
            return;
        }

        navigate('/booking/success');
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate(form);

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        bookingRequest(form);
    }

    if (!tour) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="bookingPage">

            <h1>Бронирование тура</h1>

            {serverError && <div>{serverError}</div>}

            <form onSubmit={handleSubmit}>

                <h2>{tour.tourName}</h2>

                <input
                    name="name"
                    placeholder="Имя"
                    onChange={handleChange}
                />
                {error.name && <div>{error.name}</div>}

                <input
                    name="phone"
                    placeholder="Телефон"
                    onChange={handleChange}
                />
                {error.phone && <div>{error.phone}</div>}

                <select
                    name="tour_date_id"
                    value={form.tour_date_id}
                    onChange={handleChange}
                >
                    <option value="">Выберите дату</option>

                    {schedule.map((date) => {

                        const available = date.total_slots - date.booked_slots;

                        return (
                            <option key={date.tourDateId} value={date.tourDateId}>
                                {new Date(date.startDate).toLocaleDateString('ru-RU')}
                                {" | "}
                                {date.price} ₽
                                {" | "}
                                {available > 0 ? `мест: ${available}` : "нет мест"}
                            </option>
                        );
                    })}
                </select>

                {error.tour_date_id && <div>{error.tour_date_id}</div>}

                <textarea
                    name="comment"
                    onChange={handleChange}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Бронируем..." : "Забронировать"}
                </button>

            </form>
        </div>
    );
}