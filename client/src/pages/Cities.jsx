import { useState, useEffect } from "react";
import CityCard from "../components/CityCard";
// добавить на страницу города доступные туры в этот город
export default function Cities() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                
                const response = await fetch('/api/cities');

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: статус ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setCities(data.cities);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [])

    if (isLoading) {
        return <div>Загружаем список городов...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <main>
                {cities.map((city) => ( 
                    <CityCard key={city.id} city={city}/>
                ))}
            </main>
        </div>
    )
}