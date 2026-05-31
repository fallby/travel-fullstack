export default function Booking() {
    const [serverError, setServerError] = useState('');
    const [form, setForm] = useState(
        {
            name: '',
            phoneNumber: '',
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
        const phoneNumberPattern = /^\+7\s?[\(]{0,1}\d{3}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/;

        if (form.name === '') {
            errors.name = "Введите имя.";
        }

        if (form.phoneNumber === '') {
            errors.phoneNumber = "Введите email.";
        } else if (!phoneNumberPattern.test(form.phoneNumber)) {
            errors.phoneNumber = "Некорректный номер телефона.";
        }

        return errors;
    }

    async function booking(form) {
        const { data } = form;
        let response = await fetch('/api/booking', {
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
        <div className="booking_page">
            <h1>Бронирование заказа</h1>
            <form method="post" target="self" className="booking_form" noValidate onSubmit={handleSubmit}>
                <div>
                    <p>1. Личные данные</p>
                    <input type="text" className="name" name="name" placeholder="Введите имя" onChange={handleChange}></input>
                    {error.name && <div>{error.name}</div>}
            
                    <input type="tel" className="phoneNumber_input" name="phoneNumber" placeholder="Введите номер телефона" onChange={handleChange}></input>
                    {error.phoneNumber && <div>{error.phoneNumber}</div>}
                </div>
                <div>
                    <p>3. Выбор тура</p>
                    
                </div>
                <div>
                    <p>4. Выбор дат</p>
                </div>
                <button>Забронировать</button>
            </form>




        </div>
    )
}