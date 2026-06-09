import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Registration() {
    let navigate = useNavigate();
    const [error, setError] = useState({});
    const [serverError, setServerError] = useState('');
    const [form, setForm] = useState(
        {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
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
            registration(form);
        }
    }

    function validate(form) {
        let errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPatternNumbers = /\d/;
        const passwordPatternLetters = /[a-zA-Z]/;
        const passwordPatternSymbols = /\W/;

        if (form.name === '') {
            errors.name = "Введите имя.";
        }

        if (form.surname === '') {
            errors.surname = "Введите фамилию.";
        }

        if (form.email === '') {
            errors.email = "Введите email.";
        } else if (!emailPattern.test(form.email)) {
            errors.email = "Некорректный email.";
        }

        if (form.password === '') {
            errors.password = "Введите пароль.";
        } else if (form.password.length < 8) {
            errors.password = "Длина пароля должна быть не менее 8 символов.";
        } else if (passwordPatternNumbers.test(form.password) === false) {
            errors.password = "Пароль должен содержать цифры от 0-9.";
        } else if (passwordPatternLetters.test(form.password) === false) {
            errors.password = "Пароль должен содержать буквы a-z или A-Z.";
        } else if (passwordPatternSymbols.test(form.password) === false) {
            errors.password = "Пароль должен содержать любой специальный символ.";
        }

        if (form.confirmPassword === '') {
            errors.confirmPassword = "Повторите пароль.";
        } else if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Пароли не совпадают.";
        }

        return errors;
    }

    async function registration(form) {
        const { confirmPassword, ...data } = form;
        let response = await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            setServerError(`HTTP error! Status: ${response.status}`);
            return;
        } else {
            setServerError('');
            const responseData = await response.json();
            const token = responseData.access_token;
            localStorage.setItem('token', token);
            navigate("/tours");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Регистрация</h1>
                {serverError && <div className="error-text">{serverError}</div>}
                <form method="post" target="self" noValidate onSubmit={handleSubmit}>
                    <input type="text" className="name" name="name" placeholder="Введите имя" onChange={handleChange}></input>
                    {error.name && <div className="error-text">{error.name}</div>}
                    <input type="text" className="surname" name="surname" placeholder="Введите фамилию" onChange={handleChange}></input>
                    {error.surname && <div className="error-text">{error.surname}</div>}
                    <input type="email" className="email_input" name="email" placeholder="Введите email" onChange={handleChange}></input>
                    {error.email && <div className="error-text">{error.email}</div>}
                    <input type="password" className="password_input" name="password" placeholder="Введите пароль" onChange={handleChange}></input>
                    {error.password && <div className="error-text">{error.password}</div>}
                    <input type="password" className="confirm_password_input" name="confirmPassword" placeholder="Повторите пароль" onChange={handleChange}></input>
                    {error.confirmPassword && <div className="error-text">{error.confirmPassword}</div>}
                    <button type="submit">Зарегистрироваться</button>
                    <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
                </form>
            </div>
        </div>
    )
}