// 1. Llamamos a la herramienta que lee el archivo secreto .env
require('dotenv').config();

// 2. Llamamos a la herramienta de PostgreSQL
const { Pool } = require('pg');

// 3. Le decimos que se conecte usando la URL secreta
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 4. Hacemos una consulta de prueba a la base de datos
pool.query('SELECT NOW()', (error, resultado) => {
    if (error) {
        console.error('Error conectando a la base de datos:', error.stack);
    } else {
        console.log('¡Conexión exitosa a Neon! Fecha del servidor:', resultado.rows[0]);
    }
    // 5. Cerramos la conexión para que no se quede colgada
    pool.end(); 
});