import { Link } from "react-router-dom";

export default function CityCard({ city }) {
    return (
        <div className="city-card">
            <img
                className="city-card-image"
                src={`/images/cities/${city.id}/main.jpg`}
                alt={city.name}
            />

            <div className="city-card-content">
                <h3>{city.name}</h3>

                <p>
                    {city.description.slice(0, 120)}...
                </p>

                <Link
                    to={`/cities/${city.id}`}
                    className="city-card-link"
                >
                    Узнать подробнее
                </Link>
            </div>
        </div>
    );
}