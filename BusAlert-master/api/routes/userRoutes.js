const express = require("express");
const router = express.Router();
const User = require("../models/User");


// Registro de usuario
router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, password, nfc, tipo } = req.body;
        const nuevoUsuario = new User({ nombre, correo, password, nfc, tipo });
        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar usuario:", error); // <---- Agregar esto
        res.status(500).json({ error: error.message }); 
    }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

module.exports = router;
