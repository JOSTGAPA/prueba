const pool = require('./conexion');

// Obtener todos los productos
const getProductos = async () => {
    const result = await pool.query('SELECT * FROM productos');
    return result.rows;
};

// Obtener usuario por email
const getUsuarioByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
};

// Crear usuario
const createUsuario = async (nombre, email, password) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
        [nombre, email, password]
    );
    return result.rows[0];
};

module.exports = { getProductos, getUsuarioByEmail, createUsuario };