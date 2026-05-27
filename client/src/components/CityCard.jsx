import { Link } from "react-router-dom";

export default function CityCard({ city }) {
    return (
        <div className="cityCard">
            {/* <img src="" alt="" /> */}
            <div>{city.name}</div>
            <div>{city.description.slice(0, 120)}</div>
            <Link to={`/cities/${city.id}`}>
                <button>Узнать подробнее</button>
            </Link>
        </div>
    )
}
