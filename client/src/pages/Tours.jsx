import { useState, useEffect } from "react";
import TourCard from "../components/TourCard";

export default function Tours() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tours, setTours] = useState([]);
    // const [tours, setTours] = useState({
    //     tourName: '',
    //     cityName: '',
    //     startDate: '',
    //     endDate: '',
    //     duration: '',
    //     price: '',
    //     description: '',
    // });

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

    }, [])
    // https://max-gabov.ru/urok-14-useeffect-dlya-raboty-s-api-v-react/

    if (isLoading) {
        return <div>Загружаем список туров...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <main>
                {tours.map((tour) => ( 
                    <TourCard key={tour.id} tour={tour}/>
                ))}
            </main>
        </div>
    )
}