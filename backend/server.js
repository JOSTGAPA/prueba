const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { getProductos, getUsuarioByEmail, createUsuario } = require('./bd/consultas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.use(express.static(path.join(__dirname, '../frontend/css')));
app.use(express.static(path.join(__dirname, '../frontend/js')));
app.use(express.static(path.join(__dirname, '../frontend/img')));

app.get('/api/productos', async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await getUsuarioByEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        if (usuario.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        res.json({ mensaje: 'Login exitoso', usuario: { id: usuario.id, nombre: usuario.nombre } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const usuario = await createUsuario(nombre, email, password);
        res.json({ mensaje: 'Usuario creado', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📄 Página principal: http://localhost:${PORT}/index.html`);
});