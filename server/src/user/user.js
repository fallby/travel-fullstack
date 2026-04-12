const { Connection } = require("mysql2");

function registration() {
  // передаю данные полученные с формы
  // проверяю правильно ли введены на фронте
  // тут проверяю зарегистрирован ли пользователь
  // если да, вывожу где написано что пользователь зарегистрирован
  // если нет, вызываю функцию с запросом в бд и регистрирую

  
}

application.post('/api/login',(req, res) => {
    const { name, surname, email, password } = req.body;
    if (getUserByEmail(email) == ) {
        return res.json({ success: false, error: 'Пользователь уже зарегистрирован' }); //ошибки вывести в отдельный файл по номерам
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await registration(name, surname, email, hashedPassword);
        return res.json({ success: true, error: 'Пользователь зарегистрирован' });
    }
  })

function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email=?';
    return Connection.query(query, [email]);
}

function registration(name, surname, email, password) {
    const query = 'INSERT INTO users(name, surname, email, password) VALUES(?,?,?,?)';
    return Connection.query(query, [name, surname, email, password]);
}