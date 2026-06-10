import { Link } from "react-router-dom";
import "../styles/admin/AdminMainPage.css";

export default function AdminMainPage() {

    console.log(localStorage.getItem('role'));

    if (localStorage.getItem('role') !== 'admin') {
        return <div>Нет доступа</div>;
    }

    return (
        <div className="admin-main-page">

            <h1>Панель администратора</h1>

            <div className="admin-cities-dashboard">
                <Link to="/admin/cities">Города</Link>
            </div>

            <div className="admin-tours-dashboard">
                <Link to="/admin/tours">Туры</Link>
            </div>

            <div className="admin-bookings-dashboard">
                <Link to="/admin/bookings">Бронирования</Link>
            </div>

        </div>
    );
}