import { Link } from "react-router-dom";

export default function AdminMainPage() {

    console.log(localStorage.getItem('role'));
    if (localStorage.getItem('role') !== 'admin') {
        return <div>Нет доступа</div>;
    }
    
    return ( 
        <div className="adminMainPage">
            <h1> Панель администратора </h1>
            <div className="usersDashboard">
                <Link to={'/admin/users'}> Пользователи </Link>
            </div>

            <div className="citiesDashboard">
                <Link to={'/admin/cities'}> Города </Link>
            </div>

            <div className="toursDashboard">
                <Link to={'/admin/tours'}> Туры </Link>
            </div>

            <div className="bookingsDashboard">
                <Link to={'/admin/bookings'}> Бронирования </Link>
            </div>
        </div>
    )
}