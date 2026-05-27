export default function AdminMainPage() {

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

            <div className="scheduleDashboard">
                <Link to={'/admin/schedule'}> Расписание </Link>
            </div>

            <div className="bookingsDashboard">
                <Link to={'/admin/bookings'}> Бронирования </Link>
            </div>
        </div>
    )
}