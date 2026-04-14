import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error);
            } else {
                navigate("/tours");
            }
        } catch (err) {
            setError("Ошибка сервера");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Войти</button>

            {error && <p>{error}</p>}

            <p>
                Еще не зарегистрированы?{" "}
                <Link to="/registration">Зарегистрироваться</Link>
            </p>
        </form>
    );
}