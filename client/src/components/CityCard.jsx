import { Link } from "react-router-dom";
import "../styles/CityCard.css";
import izhevsk from "../img/cities/Ижевск, Удмуртия/main.jpg";
import kazan from "../img/cities/Казань, Татарстан/main.jpg";
import chelyabinsk from "../img/cities/Челябинск, Челябинская область/main.jpg";
import moscow from "../img/cities/Москва, Московская область/main.jpg";
import spb from "../img/cities/Санкт‑Петербург, Ленинградская область/main.jpg";
import vladivostok from "../img/cities/Владивосток, Приморский край/main.jpg";
import sochi from "../img/cities/Сочи, Краснодарский край/main.jpg";
import ekb from "../img/cities/Екатеринбург, Свердловская область/main.jpg";
import novosibirsk from "../img/cities/Новосибирск, Новосибирская область/main.jpg";
import kaliningrad from "../img/cities/Калининград, Калининградская область/main.jpg";
import murmansk from "../img/cities/Мурманск, Мурманская область/main.jpg";
import petropavlovsk from "../img/cities/Петропавловск-Камчатский, Камчатский край/main.jpg";

const cityImages = {
    "Ижевск, Удмуртия": izhevsk,
    "Казань, Татарстан": kazan,
    "Челябинск, Челябинская область": chelyabinsk,
    "Москва, Московская область": moscow,
    "Санкт‑Петербург, Ленинградская область": spb,
    "Владивосток, Приморский край": vladivostok,
    "Сочи, Краснодарский край": sochi,
    "Екатеринбург, Свердловская область": ekb,
    "Новосибирск, Новосибирская область": novosibirsk,
    "Калининград, Калининградская область": kaliningrad,
    "Мурманск, Мурманская область": murmansk,
    "Петропавловск-Камчатский, Камчатский край": petropavlovsk
};


export default function CityCard({ city }) {
    return (
        <div className="city-card">
            <div className="city-card-image">
                <img src={cityImages[city.name]} alt={city.name} />
            </div>
            <div className="city-card-content">
                <h3 className="city-card-title">{city.name}</h3>
                <p className="city-card-text">
                    {city.description.slice(0, 120)}...
                </p>
                <Link to={`/cities/${city.id}`} className="city-card-link">
                    Узнать подробнее
                </Link>
            </div>
        </div>
    );
}