import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
                const responceSchedule = await fetch(`/api/tours/${id}/dates`);

                if (!responseTour.ok) {
                    throw new Error(`Ошибка HTTP: статус ${responseTour.status}`);
                }
                if (!responceSchedule.ok) {
                    throw new Error(`Ошибка HTTP: статус ${responceSchedule.status}`);
                }

                const tourData = await responseTour.json();
                const scheduleData = await responceSchedule.json();
                console.log(tourData);
                setTour(tourData.tour[0]);
                console.log(scheduleData);
                setSchedule(scheduleData.tour);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [id])

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!tour) {
        return <div>Тур не найден</div>;
    }

    function handleBooking() {
        navigate(`/booking/${id}`);
    }

    return (
        <div className="tour">
            <h3>{tour.tourName}</h3>
            <div>{tour.cityName}</div>
            <div>{tour.durationDays}</div>
            <div>{tour.description}</div>
            {schedule.length === 0 ? (
                <div>Нет доступных дат</div>
            ) : (
                schedule.map((date) => {

                    const available = date.total_slots - date.booked_slots;

                    return (
                        <div key={date.id}>

                            <div>
                                {new Date(date.startDate).toLocaleDateString('ru-RU')}
                                {" - "}
                                {new Date(date.endDate).toLocaleDateString('ru-RU')}
                            </div>

                            <div>{date.price} ₽</div>

                            {available > 0 ? (
                                <div>Осталось мест: {available}</div>
                            ) : (
                                <div style={{ color: "red" }}>
                                    Нет мест
                                </div>
                            )}

                            <button disabled={available === 0} onClick={handleBooking}>
                                Забронировать
                            </button>

                        </div>
                    );
                })
            )}

        </div>
    )
}