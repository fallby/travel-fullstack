import { useState, useEffect } from "react";
import TourCard from "../components/TourCard";
import "../styles/Tours.css";

export default function Tours() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tours, setTours] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const response = await fetch('/api/tours');

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: статус ${response.status}`);
                }

                const data = await response.json();
                setTours(data.tours);
                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) return <div className="loading">Загружаем список туров...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="tours-page">
            <h1 className="tours-title">Все туры</h1>

            <div className="tours-grid">
                {tours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
}