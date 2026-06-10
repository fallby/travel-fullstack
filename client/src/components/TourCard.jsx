import { Link } from "react-router-dom";
import "../styles/TourCard.css";

export default function TourCard({ tour }) {
    return (
        <div className="tour-card">
            <div className="tour-card-content">
                <h3 className="tour-title">{tour.tourName}</h3>
                <div className="tour-city">{tour.cityName}</div>
                <div className="tour-duration">{tour.durationDays} дней</div>
                <div className="tour-price">от {tour.minPrice} ₽</div>
                <p className="tour-desc">
                    {tour.description.slice(0, 120)}
                </p>
            </div>

            <Link to={`/tours/${tour.id}`} className="tour-btn">
                Узнать подробнее
            </Link>
        </div>
    );
}