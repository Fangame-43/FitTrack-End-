const { Usuario, Actividad } = require('../models');

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;

// URL a la que mandamos al usuario para que autorice
exports.getAuthUrl = () =>
    `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code&scope=activity:read_all`;

// Intercambia el code por tokens y los guarda en el usuario
exports.handleCallback = async (usuario_id, code) => {
    const res = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        }),
    });

    if (!res.ok) throw new Error('Error al obtener token de Strava');
    const data = await res.json();

    await Usuario.update({
        strava_token: data.access_token,
        strava_refresh_token: data.refresh_token,
        strava_token_expiry: new Date(data.expires_at * 1000),
    }, { where: { id: usuario_id } });
};

// Refresca el token si está vencido
const refrescarToken = async (usuario) => {
    const vencido = !usuario.strava_token_expiry ||
        new Date() >= new Date(usuario.strava_token_expiry);
    if (!vencido) return usuario.strava_token;

    const res = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: usuario.strava_refresh_token,
            grant_type: 'refresh_token',
        }),
    });

    if (!res.ok) throw new Error('Error al refrescar token de Strava');
    const data = await res.json();

    await Usuario.update({
        strava_token: data.access_token,
        strava_refresh_token: data.refresh_token,
        strava_token_expiry: new Date(data.expires_at * 1000),
    }, { where: { id: usuario.id } });

    return data.access_token;
};

// Mapea el tipo de Strava al ENUM de FitTrack
const mapearTipo = (tipo) => {
    const mapa = {
        Run: 'correr',
        Ride: 'ciclismo',
        Swim: 'natacion',
        Walk: 'caminata',
        Workout: 'gimnasio',
    };
    return mapa[tipo] || 'otro';
};

// Importa actividades recientes desde Strava
exports.importarActividades = async (usuario_id) => {
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario?.strava_token) throw new Error('Cuenta de Strava no conectada');

    const token = await refrescarToken(usuario);

    const res = await fetch(
        'https://www.strava.com/api/v3/athlete/activities?per_page=30',
        { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error('Error al obtener actividades de Strava');
    const actividades = await res.json();

    let importadas = 0;
    let duplicadas = 0;

    for (const a of actividades) {
        const existe = await Actividad.findOne({ where: { strava_id: String(a.id) } });
        if (existe) { duplicadas++; continue; }

        await Actividad.create({
            usuario_id,
            tipo: mapearTipo(a.type),
            duracion_min: Math.round(a.moving_time / 60),
            calorias: a.kilojoules ? Math.round(a.kilojoules * 0.239) : null,
            distancia_km: a.distance ? parseFloat((a.distance / 1000).toFixed(2)) : null,
            fecha: a.start_date_local.split('T')[0],
            notas: a.name || null,
            strava_id: String(a.id),
        });

        importadas++;
    }

    return { importadas, duplicadas };
};