import { useEffect, useState } from "react";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        setLoading(true);

        const response = await fetch("/api/bookings");
        const data = await response.json();

        setBookings(data.bookings);
        setLoading(false);
    }

    async function updateStatus(id, status) {
        await fetch(`/api/bookings/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        fetchBookings();
    }

    function translateStatus(status) {
        switch (status) {
            case "new":
                return "Новая";
            case "contacted":
                return "Связались";
            case "confirmed":
                return "Подтверждена";
            case "cancelled":
                return "Отменена";
            default:
                return status;
        }
    }

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="adminBookings">
            <h1>Бронирования</h1>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Тур</th>
                        <th>Даты</th>
                        <th>Комментарий</th>
                        <th>Статус</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((b) => (
                        <tr key={b.id}>
                            <td>{b.name}</td>
                            <td>{b.phone}</td>
                            <td>{b.tourName}</td>
                            <td>
                                {new Date(b.startDate).toLocaleDateString()} -{" "}
                                {new Date(b.endDate).toLocaleDateString()}
                            </td>
                            <td>{b.comment || "—"}</td>

                            <td>
                                <select
                                    value={b.status}
                                    onChange={(e) => updateStatus(b.id, e.target.value)}
                                >
                                    <option value="new">Новая</option>
                                    <option value="contacted">Связались</option>
                                    <option value="confirmed">Подтверждена</option>
                                    <option value="cancelled">Отменена</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}