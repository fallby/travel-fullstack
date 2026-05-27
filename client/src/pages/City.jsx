import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function City() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const response = await fetch(`/api/cities/${id}`);

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: статус ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setCity(data.city);
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

    if (!city) {
        return <div>Город не найден</div>;
    }

    return (
        <div className="city">
            <div>{city.name}</div>
            <div>{city.description}</div>
        </div>
    )
}