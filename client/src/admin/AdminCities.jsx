import { useEffect, useState } from "react";

export default function AdminCities() {

    const [cities, setCities] = useState([]);
    const [editingCityId, setEditingCityId] = useState(null);

    const [form, setForm] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        fetchCities();
    }, []);

    async function fetchCities() {

        const response = await fetch('/api/cities');
        const data = await response.json();

        setCities(data.cities);
    }

    function handleChange(event) {

        const value = event.target.value;
        const fieldName = event.target.name;

        setForm({
            ...form,
            [fieldName]: value
        });
    }

    async function createCity() {

        const response = await fetch('/api/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            return;
        }

        setForm({
            name: '',
            description: ''
        });

        fetchCities();
    }

    async function updateCity() {

        const response = await fetch(`/api/cities/${editingCityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            return;
        }

        setEditingCityId(null);

        setForm({
            name: '',
            description: ''
        });

        fetchCities();
    }

    function editCity(city) {

        setEditingCityId(city.id);

        setForm({
            name: city.name,
            description: city.description
        });
    }

    function handleSubmit(event) {

        event.preventDefault();

        if (editingCityId) {
            updateCity();
        } else {
            createCity();
        }
    }

    return (
        <div className="adminCities">

            <h1>Города</h1>

            <form onSubmit={handleSubmit}>

                <input type="text" name="name" placeholder="Название города" value={form.name} onChange={handleChange} />

                <textarea name="description" placeholder="Описание города" value={form.description} onChange={handleChange}></textarea>

                <button type="submit">
                    {editingCityId ? 'Сохранить изменения' : 'Добавить город'}
                </button>

            </form>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                </thead>

                <tbody>

                    {cities.map((city) => (
                        <tr key={city.id}>

                            <td>{city.id}</td>

                            <td>{city.name}</td>

                            <td>{city.description}</td>

                            <td>
                                <button onClick={() => editCity(city)}>
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