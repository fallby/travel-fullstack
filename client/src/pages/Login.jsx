import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const [error, setError] = useState({});
    const [serverError, setServerError] = useState('');
    const [form, setForm] = useState(
        {
            email: '',
            password: '',
        }
    );

    function handleChange(event) {
        let value = event.target.value;
        let fieldName = event.target.name;
        let newForm = { ...form };
        newForm[fieldName] = value;
        setForm(newForm);

        let newErrors = { ...error };
        if (newErrors[fieldName]) {
            newErrors[fieldName] = '';
        }
        setError(newErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let errors = validate(form);

        if (Object.keys(errors).length !== 0) {
            setError(errors);
        } else {
            login(form);
        }
    }

    function validate(form) {
        let errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (form.email === '') {
            errors.email = "Введите email.";
        } else if (!emailPattern.test(form.email)) {
            errors.email = "Некорректный email.";
        }

        if (form.password === '') {
            errors.password = "Введите пароль.";
        }

        return errors;
    }

    async function login(form) {
        setServerError('');
        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (!response.ok) {
            setServerError("Неверный email или пароль");
            return;
        } else {
            setServerError('');
            const responseData = await response.json();
            const token = responseData.access_token;
            const role = responseData.user.role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/tours");
            }
        }
    }

    return (
        <div>
            {serverError && <div>{serverError}</div>}
            <form method="post" target="self" noValidate onSubmit={handleSubmit}>
                <input type="email" className="email_input" name="email" placeholder="Введите email" onChange={handleChange}></input>
                {error.email && <div>{error.email}</div>}
                <input type="password" className="password_input" name="password" placeholder="Введите пароль" onChange={handleChange}></input>
                {error.password && <div>{error.password}</div>}
                <button type="submit" className="login_button">Войти</button>
                {/* <Link to="/" className="login_button">Войти</Link> */}
                <p>Ещё не зарегистрированы? <Link to="/registration">Зарегистрироваться</Link></p>
            </form>
        </div>
    )
}