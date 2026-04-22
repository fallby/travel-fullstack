import { Link } from "react-router-dom";

export default function Registration() {
    // проверка введенных данных - имя, фамилия, емаил и пароль

    let inputFieldName = document.getElementsByClassName("name_input");
    if (inputFieldName.value === "") {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Введите имя";
        //сделать как красный текст под полем
    }

    let inputFieldSurname = document.getElementsByClassName("surname_input");
    if (inputFieldSurname.value === "") {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Введите фамилию";
    }

    let inputFieldEmail = document.getElementsByClassName("email_input");
    if (inputFieldEmail.value === "") {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Введите email";
    }
    let emailField = document.getElementById("myEmail");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value)) {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Некорректный email";
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    
    let inputFieldPassword = document.getElementsByClassName("password_input");
    if (inputFieldPassword.value === "") {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Введите пароль";
    }

    const passwordPatternNumbers = /^(?=.*\d)$/;
    if (passwordPatternNumbers.test(inputFieldPassword) === false) {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Пароль должен содержать цифру";
    }

    if (inputFieldPassword.value < 8) {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Длина пароля должна быть не менее 8 символов";
    }

    let confirmPasswordInput = document.getElementsByClassName("confirm_password_input");
    if (inputFieldPassword.value !== confirmPasswordInput.value) {
        let div = document.createElement('div');
        div.className = "error_message";
        div.innerHTML = "Пароли не совпадают";
    }

    return (
        <div>
            <form action="" method="post" target="self">
                <input type="text" className="name" class="name_input" required placeholder="Введите имя" maxlength="45"></input>
                <input type="text" className="surname" class="surname_input" required placeholder="Введите фамилию" maxlength="45"></input>
                <input type="email" className="email_input" required placeholder="Введите email"></input>
                <input type="password" className="password_input" required placeholder="Введите пароль"></input>
                <input type="password" className="confirm_password_input" required placeholder="Повторите пароль"></input>
                <Link to="/" class="registration_button">Зарегистрироваться</Link>
                <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
            </form>
        </div>
    )
}