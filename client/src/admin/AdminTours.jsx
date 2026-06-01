import { useEffect, useState } from "react";

export default function AdminTours() {

    const [cities, setCities] = useState([]);
    const [tours, setTours] = useState([]);

    const [editingTourId, setEditingTourId] = useState(null);

    const [tourForm, setTourForm] = useState({
        city_id: '',
        name: '',
        description: '',
        duration_days: ''
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
        const res = await fetch('/api/tours');
        const data = await res.json();
        setTours(data.tours);
    }

    function handleChange(e) {
        setTourForm({
            ...tourForm,
            [e.target.name]: e.target.value
        });
    }

    function resetForm() {
        setTourForm({
            city_id: '',
            name: '',
            description: '',
            duration_days: ''
        });
        setEditingTourId(null);
    }

    async function createTour() {
        const res = await fetch('/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tourForm)
        });

        if (!res.ok) return;

        resetForm();
        fetchTours();
    }

    async function updateTour() {
        const res = await fetch(`/api/tours/${editingTourId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tourForm)
        });

        if (!res.ok) return;

        resetForm();
        fetchTours();
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (editingTourId) {
            updateTour();
        } else {
            createTour();
        }
    }

    function editTour(tour) {
        setEditingTourId(tour.id);

        setTourForm({
            city_id: tour.city_id,
            name: tour.name,
            description: tour.description,
            duration_days: tour.duration_days
        });
    }

    return (
        <div className="adminTours">

            <h1>Туры</h1>

            <form onSubmit={handleSubmit}>

                <select
                    name="city_id"
                    value={tourForm.city_id}
                    onChange={handleChange}
                >
                    <option value="">
                        Выберите город
                    </option>

                    {cities.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="name"
                    placeholder="Название тура"
                    value={tourForm.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Описание"
                    value={tourForm.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="duration_days"
                    placeholder="Длительность (дней)"
                    value={tourForm.duration_days}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingTourId ? "Сохранить" : "Создать"}
                </button>

            </form>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Город</th>
                        <th>Дней</th>
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
                                <button onClick={() => editTour(tour)}>
                                    Изменить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}