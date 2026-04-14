import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/countries">Страны</Link>
            <Link to="/tours">Туры</Link>
            <Link to="/login">Войти</Link>
        </nav>
    )
}
//https://metanit.com/web/react/4.3.php как выделить активную ссылку