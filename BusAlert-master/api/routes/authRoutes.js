const express = require("express");
const router = express.Router();
const { registrarUsuario, loginUsuario } = require("../controllers/authController");
const verificarToken = require("../middleware/authMiddleware");

// Rutas públicas
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

// Ruta protegida (solo para usuarios autenticados)
router.get("/perfil", verificarToken, (req, res) => {
    res.json({ message: "Accediste al perfil", usuario: req.usuario });
});

module.exports = router;
