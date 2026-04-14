import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h2>Регистрация</h2>

      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Фамилия"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

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

      <button type="submit">Зарегистрироваться</button>

      {error && <p>{error}</p>}
    </form>
  );
}