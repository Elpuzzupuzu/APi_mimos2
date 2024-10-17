const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar las variables del archivo .env

const jwtSecret = process.env.JWT_SECRET;  // Cargar la clave secreta desde .env

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], jwtSecret);  // Asegúrate de que solo uses el token después de "Bearer"
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' });
    }
};
