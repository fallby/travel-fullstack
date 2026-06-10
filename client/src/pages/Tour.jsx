import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Tour.css";

export default function Tour() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tour, setTour] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const responseTour = await fetch(`/api/tours/${id}`);
                const responseSchedule = await fetch(`/api/tours/${id}/dates`);

                if (!responseTour.ok || !responseSchedule.ok) {
                    throw new Error("Ошибка загрузки данных");
                }

                const tourData = await responseTour.json();
                const scheduleData = await responseSchedule.json();

                setTour(tourData.tour[0]);
                setSchedule(scheduleData.tour);
                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (isLoading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!tour) return <div>Тур не найден</div>;

    function handleBooking(dateId) {
        navigate(`/booking/${dateId}`);
    }

    return (
        <div className="tour-page">

            <div className="tour-header">
                <h1>{tour.tourName}</h1>
                <div className="tour-meta">
                    <span>{tour.cityName}</span>
                    <span>{tour.durationDays} дней</span>
                </div>
                <p className="tour-desc">{tour.description}</p>
            </div>

            <h2>Доступные даты</h2>

            {schedule.length === 0 ? (
                <p>Нет доступных дат</p>
            ) : (
                <div className="schedule-list">

                    {schedule.map((date) => {
                        const available = date.total_slots - date.booked_slots;

                        return (
                            <div className="schedule-card" key={date.tourDateId}>

                                <div className="schedule-date">
                                    {new Date(date.startDate).toLocaleDateString('ru-RU')}
                                    {" — "}
                                    {new Date(date.endDate).toLocaleDateString('ru-RU')}
                                </div>

                                <div className="schedule-price">
                                    {date.price} ₽
                                </div>

                                <div className="schedule-slots">
                                    {available > 0
                                        ? `Осталось мест: ${available}`
                                        : "Нет мест"}
                                </div>

                                <button
                                    disabled={available === 0}
                                    onClick={() => handleBooking(date.tourDateId)}
                                >
                                    Забронировать
                                </button>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}