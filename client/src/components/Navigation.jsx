import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";
import logo from "../img/logo.png";

export default function Navigation() {
    const token = localStorage.getItem("token");
    const isAuth = !!token;

    function logout() {
        localStorage.removeItem("token");
    }

    return (
        <nav>
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/">Главная</Link>
                <Link to="/cities">Города</Link>
                <Link to="/tours">Туры</Link>
            </div>
            <div className="nav-btn">
                {isAuth ? (<button onClick={logout}>Выйти</button>) : (<Link to="/login">Войти</Link>)}
            </div>
        </nav>
    )
}