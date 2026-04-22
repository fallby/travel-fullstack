import { Link } from "react-router-dom";

export default function Login() {
    // проверка введенных данных - емаил
    return (
        <div>
            <form action="" method="post" target="self">
                <input type="email" class="email_input" required placeholder="Введите email"></input>
                <input type="password" class="password_input" required placeholder="Введите пароль"></input>
                <Link to="/" class="login_button">Войти</Link>
                <p>Ещё не зарегистрированы? <Link to="/registration">Зарегистрироваться</Link></p>
            </form>
        </div>
    )
}