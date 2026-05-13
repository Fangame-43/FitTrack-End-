module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).render('error', { mensaje: err.message || 'Error interno del servidor' });
};