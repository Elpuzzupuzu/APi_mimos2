      
      
      const { Sequelize } = require('sequelize');

      const sequelize = new Sequelize('mimitos2', 'root', '1234', {
        host: 'localhost',
          dialect: 'mysql'
      });

      module.exports = sequelize;

    // config/database.js




/// CONFIGURACION PARA LA DB EN LA NUBE

// require('dotenv').config(); // Asegúrate de requerir dotenv

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   port: process.env.DB_PORT,
//   logging: false
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Conexión a la base de datos exitosa');
//   })
//   .catch(err => {
//     console.error('Error al conectar a la base de datos:', err);
//   });

// module.exports = sequelize;
