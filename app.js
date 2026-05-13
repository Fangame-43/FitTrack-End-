require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'fittrack_secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

app.get('/', (req, res) => res.redirect('/dashboard'));

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));
app.use(require('./middlewares/errorHandler'));

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a la base de datos');
        return sequelize.sync({ alter: false });
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Error al conectar la base de datos:', err.message);
        process.exit(1);
    });

module.exports = app;