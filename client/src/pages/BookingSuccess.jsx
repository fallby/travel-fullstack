import { Link } from "react-router-dom";
import "../styles/BookingSuccess.css";

export default function BookingSuccess() {
    return (
        <div className="successPage">
            <h1>Тур успешно забронирован</h1>
            <p>Мы получили вашу заявку и скоро с вами свяжемся</p>

            <Link to="/tours">
                <button>Вернуться к турам</button>
            </Link>
        </div>
    );
}