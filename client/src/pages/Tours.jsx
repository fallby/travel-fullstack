import { useState, useEffect } from "react";
import TourCard from "../components/TourCard";
import Navigation from "../components/Navigation"; 

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
                console.log(data);
                setTours(data.tours);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [])
    // https://max-gabov.ru/urok-14-useeffect-dlya-raboty-s-api-v-react/

    if (isLoading) {
        console.log(tours);
        return <div>Загружаем список туров...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <main>
                {tours.map((tour) => ( 
                    <TourCard key={tour.id} tour={tour}/>
                ))}
            </main>
        </div>
    )
}