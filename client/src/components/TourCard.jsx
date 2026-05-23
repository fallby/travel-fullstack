import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
    return (
        <div className="tourCard">
            {/* <img src="" alt="" /> */}
            <h3>{tour.tourName}</h3>
            <div>{tour.cityName}</div>
            <div>{tour.durationDays}</div>
            <div>{tour.minPrice}</div>
            <div>{tour.description}</div>
            <Link to={`/tours/${tour.id}`}>
                <button>Узнать подробнее</button>
            </Link>
        </div>
    )
}
