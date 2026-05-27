import { useState } from "react";
import { Link } from "react-router-dom"

export default function Nav() {
    const token = localStorage.getItem("token");
    const isAuth = !!token;

    function logout() {
        localStorage.removeItem("token");
    }

    return (
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/cities">Города</Link>
            <Link to="/tours">Туры</Link>
            <div>
                {isAuth ? (<button onClick={logout}>Выйти</button>) : (<Link to="/login">Войти</Link>)}
            </div>
        </nav>
    )
}
//https://metanit.com/web/react/4.3.php как выделить активную ссылку