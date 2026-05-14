# FitTrack

> Plataforma web para el registro y seguimiento de actividad física personal.

FitTrack es una aplicación web construida con Node.js que permite a los usuarios registrar sus entrenamientos, definir metas de fitness, desbloquear logros y comparar su progreso con otros usuarios. Incluye integración con Strava para importar actividades automáticamente.

---

## Características

- Autenticación segura con JWT y bcrypt
- Registro de actividades físicas (correr, ciclismo, natación, caminata, gimnasio)
- Sistema de metas con seguimiento de progreso en tiempo real
- Logros desbloqueables automáticamente al cumplir condiciones
- Ranking global de usuarios
- Integración con la API de Strava para importar actividades

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Base de datos | MySQL (Aiven Cloud) |
| ORM | Sequelize |
| Vistas | EJS |
| Autenticación | JWT + bcrypt |
| Estilos | CSS personalizado + Tabler Icons |

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- Una base de datos MySQL accesible (local o en la nube)
- *(Opcional)* Una cuenta de desarrollador en [Strava](https://www.strava.com/settings/api) para la integración

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Fangame-43/FitTrack-End-.git
cd fittrack
```

O si prefieres descargar el ZIP:

1. Ve a la página del repositorio en GitHub
2. Haz clic en **Code → Download ZIP**
3. Descomprime el archivo y accede a la carpeta del proyecto

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto copiando el archivo de ejemplo:

```bash
cp .env.example .env
```

Luego edita `.env` con tus propios valores:

```env
# Base de datos
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USER=tu_usuario
DB_NAME=fittrack
DB_PASSWORD=tu_contraseña

# Autenticación
JWT_SECRET=una_clave_secreta_larga_y_aleatoria

# Strava (opcional)
STRAVA_CLIENT_ID=tu_client_id
STRAVA_CLIENT_SECRET=tu_client_secret
STRAVA_REDIRECT_URI=http://localhost:3000/actividades/strava/callback

# Servidor
PORT=3000
```

> **Nota:** Si tu base de datos usa SSL (como Aiven Cloud), la conexión ya está configurada para aceptarlo. Para bases de datos locales sin SSL no es necesario ningún ajuste adicional.

### 4. Crear la base de datos

Ejecuta el script SQL incluido en el repositorio para crear las tablas y datos iniciales.

O si usas una herramienta visual como TablePlus, DBeaver o MySQL Workbench, abre el archivo `fittrack.sql` y ejecútalo directamente.

---

## Ejecución

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

Una vez iniciado, abre tu navegador y ve a:

```
http://localhost:3000
```

Verás la pantalla de inicio de sesión. Crea una cuenta nueva desde `/auth/registro` para empezar.

---

## Estructura del proyecto

```
fittrack/
├── config/
│   └── database.js         # Configuración de Sequelize
├── controllers/            # Lógica de cada ruta
├── middlewares/
│   ├── auth.js             # Verificación de JWT
│   └── errorHandler.js
├── models/                 # Modelos de Sequelize y asociaciones
├── public/
│   ├── css/style.css
│   └── img/
├── routes/                 # Definición de rutas Express
├── services/               # Lógica de negocio (metas, logros, Strava)
├── views/                  # Plantillas EJS
│   ├── auth/
│   ├── actividades/
│   ├── metas/
│   ├── logros/
│   ├── ranking/
│   └── partials/
├── .env.example
├── app.js                  # Punto de entrada
└── package.json
```

---

## Integración con Strava *(opcional)*

1. Crea una aplicación en [strava.com/settings/api](https://www.strava.com/settings/api)
2. En el campo **Authorization Callback Domain** ingresa `localhost`
3. Copia el **Client ID** y el **Client Secret** a tu archivo `.env`
4. Desde la app, ve a **Actividades → Conectar con Strava** y autoriza el acceso
5. Usa el botón **Importar actividades** para traer tus últimas 30 sesiones

---

## Variables de entorno — referencia completa

| Variable | Requerida | Descripción |
|---|---|---|
| `DB_HOST` | ✅ | Host de la base de datos MySQL |
| `DB_PORT` | ✅ | Puerto MySQL (por defecto `3306`) |
| `DB_USER` | ✅ | Usuario de la base de datos |
| `DB_PASSWORD` | ✅ | Contraseña de la base de datos |
| `DB_NAME` | ✅ | Nombre de la base de datos |
| `JWT_SECRET` | ✅ | Clave secreta para firmar tokens JWT |
| `SESSION_SECRET` | ✅ | Clave para las sesiones de Express |
| `PORT` | ❌ | Puerto del servidor (por defecto `3000`) |
| `STRAVA_CLIENT_ID` | ❌ | ID de la app en Strava |
| `STRAVA_CLIENT_SECRET` | ❌ | Secret de la app en Strava |
| `STRAVA_REDIRECT_URI` | ❌ | URL de callback OAuth de Strava |

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
