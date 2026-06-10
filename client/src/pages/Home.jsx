import { Link } from "react-router-dom";
import "../styles/Home.css";
import Kaliningrad1 from "../img/cities/Калининград, Калининградская область/Kaliningrad1.jpg";
import Moscow1 from "../img/cities/Москва, Московская область/Moscow1.webp";
import Kazan1 from "../img/cities/Казань, Татарстан/Kazan1.webp";
import Sochi1 from "../img/cities/Сочи, Краснодарский край/Sochi1.jpg";
import Chelyabinsk2 from "../img/cities/Челябинск, Челябинская область/Chelyabinsk2.jpg";
import logo from "../img/logo.png";

export default function Home() {
  return (
    <div className="home">

      <section className="main">
        <div className="main-overlay"></div>

        <div className="main-content">
          <h1>Путешествуйте по России</h1>
          <p>Откройте самые красивые места страны</p>

          <Link to="/tours" className="main-button">
            Смотреть туры
          </Link>
        </div>

        <div className="main-slider">
          <img src={Kaliningrad1} alt="Kaliningrad" />
        </div>
      </section>

      <section className="cities">
        <h2>Популярные направления</h2>

        <div className="cities-grid">
          <div className="popular-city-card">
            <img src={Moscow1} />
            <h3>Москва</h3>
          </div>

          <div className="popular-city-card">
            <img src={Kazan1} />
            <h3>Казань</h3>
          </div>

          <div className="popular-city-card">
            <img src={Sochi1} />
            <h3>Сочи</h3>
          </div>

          <div className="popular-city-card">
            <img src={Kaliningrad1} />
            <h3>Калининград</h3>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-container">

          <div className="about-text">
            <h2>О наших турах</h2>
            <p>
              Мы создаём маршруты по самым красивым местам России.
              Комфорт, безопасность и эмоции — основа каждого тура.
            </p>

            <ul>
              <li>Авторские маршруты</li>
              <li>Комфортное размещение</li>
              <li>Опытные гиды</li>
              <li>Поддержка 24/7</li>
            </ul>
          </div>

          <div className="about-image">
            <img src={Chelyabinsk2} />
          </div>

        </div>
      </section>

      <section className="advantages">
        <h2>Почему выбирают нас</h2>

        <div className="adv-grid">

          <div className="adv-card">🗺️ Проверенные маршруты</div>
          <div className="adv-card">💰 Лучшие цены</div>
          <div className="adv-card">📞 Поддержка 24/7</div>
          <div className="adv-card">⭐ Опытные гиды</div>

        </div>
      </section>

      <section className="request">
        <h2>Готовы отправиться в путешествие?</h2>
        <Link to="/tours">
          <button className="request-btn">Смотреть туры</button>
        </Link>

      </section>

      <section className="contacts">
        <h2>Контакты</h2>

        <div className="contacts-info">
          <p>📞 +7 (999) 123-45-67</p>
          <p>✉ travel@mail.ru</p>
          <p>📍 Россия</p>
        </div>
      </section>

      <footer className="footer">
        <img src={logo} className="footer-logo" />
        <p>В путь — путешествия по России</p>

        <div className="footer-links">
          <Link to="/">Главная</Link>
          <Link to="/tours">Туры</Link>
          <Link to="/cities">Города</Link>
        </div>

        <small>© 2026 Все права защищены</small>
      </footer>

    </div>
  );
}