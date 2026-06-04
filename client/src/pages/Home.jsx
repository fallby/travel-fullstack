import { Link } from "react-router-dom";
import "../styles/Home.css";
import Kaliningrad1 from "../img/cities/Kaliningrad/Kaliningrad1.jpg";

export default function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Путешествуйте по России</h1>
          <p>Откройте самые красивые места страны</p>

          <Link to="/tours" className="hero-btn">
            Смотреть туры
          </Link>
        </div>

        <div className="hero-slider">
          <img src={Kaliningrad1} alt="Kaliningrad" />
        </div>
      </section>

      {/* POPULAR CITIES */}
      <section className="cities">
        <h2>Популярные направления</h2>

        <div className="cities-grid">
          <div className="city-card">
            <img src="/images/baikal.jpg" />
            <h3>Байкал</h3>
          </div>

          <div className="city-card">
            <img src="/images/kazan.jpg" />
            <h3>Казань</h3>
          </div>

          <div className="city-card">
            <img src="/images/sochi.jpg" />
            <h3>Сочи</h3>
          </div>

          <div className="city-card">
            <img src="/images/kaliningrad.jpg" />
            <h3>Калининград</h3>
          </div>
        </div>
      </section>

      {/* ABOUT */}
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
            <img src="/images/altai.jpg" />
          </div>

        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="advantages">
        <h2>Почему выбирают нас</h2>

        <div className="adv-grid">

          <div className="adv-card">🗺️ Проверенные маршруты</div>
          <div className="adv-card">💰 Лучшие цены</div>
          <div className="adv-card">📞 Поддержка 24/7</div>
          <div className="adv-card">⭐ Опытные гиды</div>

        </div>
      </section>

      {/* REQUEST */}
      <section className="request">
        <h2>Готовы отправиться в путешествие?</h2>
        <p>Оставьте заявку — мы подберём идеальный тур</p>

        <button className="request-btn">Оставить заявку</button>
      </section>

      {/* CONTACTS */}
      <section className="contacts">
        <h2>Контакты</h2>

        <div className="contacts-info">
          <p>📞 +7 (999) 123-45-67</p>
          <p>✉ travel@mail.ru</p>
          <p>📍 Россия</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <img src="/logo.png" className="footer-logo" />
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