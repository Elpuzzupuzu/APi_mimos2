const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, last_name, user_name, mail, password, date_birth } = req.body;

        // Llama al servicio para crear el usuario
        const newUser = await userService.registerUser({
            name,
            last_name,
            user_name,
            mail,
            password,  // No hagas el hash aquí, lo maneja el servicio
            date_birth
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};




// // Función para login de usuario
// exports.login = async (req, res) => {
//     try {
//         const { user_name, password } = req.body;

//         // Llama al servicio para autenticar al usuario
//         const token = await userService.loginUser(user_name, password);

//         // Enviar el token JWT al cliente
//         res.json({ accessToken: token });
//     } catch (error) {
//         res.status(500).json({ message: 'Error en el servidor', error: error.message });
//     }
// };


exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Llama al servicio para autenticar al usuario
        const { token, id_user } = await userService.loginUser(user_name, password);

        // Enviar el token JWT y el id_user al cliente
        res.json({ accessToken: token, id_user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
