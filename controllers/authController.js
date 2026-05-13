const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.mostrarLogin = (req, res) => res.render('auth/login', { page: 'auth' });

exports.mostrarRegistro = (req, res) => res.render('auth/registro', { page: 'auth' });

exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
            req.flash('error', 'El email ya está registrado');
            return res.redirect('/auth/registro');
        }
        const password_hash = await bcrypt.hash(password, 10);
        await Usuario.create({ nombre, email, password_hash });
        req.flash('success', 'Cuenta creada. Inicia sesión.');
        res.redirect('/auth/login');
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario || !(await bcrypt.compare(password, usuario.password_hash))) {
            req.flash('error', 'Credenciales incorrectas');
            return res.redirect('/auth/login');
        }
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.redirect('/dashboard');
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
