const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generar un Token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, nfc, tipo } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await User.findOne({ correo });
        if (existeUsuario) return res.status(400).json({ error: "El correo ya está registrado" });

        const nuevoUsuario = new User({ nombre, correo, password, nfc, tipo });
        await nuevoUsuario.save();

        // Generar Token
        const token = generarToken(nuevoUsuario._id);
        res.status(201).json({ message: "Usuario registrado exitosamente", token });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

// Inicio de sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await User.findOne({ correo });

        if (!usuario || !(await usuario.compararPassword(password))) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Generar Token
        const token = generarToken(usuario._id);
        res.json({ message: "Inicio de sesión exitoso", token, usuario: { id: usuario._id, nombre: usuario.nombre } });
    } catch (error) {
        res.status(500).json({ error: "Error en el inicio de sesión" });
    }
};
