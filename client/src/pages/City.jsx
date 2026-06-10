import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/City.css";

export default function City() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState(null);
    const [tours, setTours] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const responseCity = await fetch(`/api/cities/${id}`);
                const responseTours = await fetch(`/api/tours`);

                if (!responseCity.ok || !responseTours.ok) {
                    throw new Error("Ошибка загрузки данных");
                }

                const cityData = await responseCity.json();
                const toursData = await responseTours.json();

                setCity(cityData.city);

                const cityTours = toursData.tours.filter(
                    tour => tour.cityName === cityData.city.name
                );

                setTours(cityTours);

                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!city) return <div>Город не найден</div>;

    return (
        <div className="city-page">

            <div className="city-header">
                <h1>{city.name}</h1>
                <p className="city-desc">{city.description}</p>
            </div>

            <div className="city-tours">
                <h2>Доступные туры</h2>

                {tours.length === 0 ? (
                    <p>В этом городе пока нет туров</p>
                ) : (
                    <div className="tour-grid">
                        {tours.map(tour => (
                            <div className="tour-card" key={tour.id}>
                                <h3>{tour.name}</h3>

                                <p className="tour-text">
                                    {tour.description.slice(0, 120)}...
                                </p>

                                <p className="tour-price">
                                    от <b>{tour.minPrice} ₽</b>
                                </p>

                                <Link to={`/tours/${tour.id}`} className="tour-btn">
                                    Перейти к туру
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}