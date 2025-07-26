const express = require("express");
const router = express.Router();
const Tarjeta = require("../models/Tarjeta");
const verificarToken = require("../middleware/authMiddleware");  // Asegúrate de importar el middleware

// Registrar tarjeta
router.post("/registrar", verificarToken, async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(400).json({ error: "Usuario no encontrado en el token" });
        }

        const usuarioId = req.usuario._id;
        const tarjetaExistente = await Tarjeta.findOne({ usuario: usuarioId });
        if (tarjetaExistente) {
            return res.status(400).json({ error: "El usuario ya tiene una tarjeta registrada" });
        }
        const nuevaTarjeta = new Tarjeta({ usuario: usuarioId});
        await nuevaTarjeta.save();        
        nuevaTarjeta.folio = nuevaTarjeta._id.toString();
        await nuevaTarjeta.save();


        res.status(201).json({ message: "Tarjeta registrada correctamente", tarjeta: nuevaTarjeta });
    } catch (error) {
        console.error(error); // Esto es útil para ver el error en los logs
        res.status(500).json({ error: "Error al registrar tarjeta" });
    }
}); 

// Recargar saldo
router.post("/recargar", verificarToken, async (req, res) => {
    try {
        
        const usuarioId = req.usuario._id;
        const tarjeta = await Tarjeta.findOne({ usuario: usuarioId});
        if (!tarjeta) return res.status(404).json({ error: "Tarjeta no encontrada" });
        const { monto } = req.body;

        tarjeta.saldo += monto;
        await tarjeta.save();
        res.json({ message: "Recarga exitosa", saldo: tarjeta.saldo });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al recargar saldo" });
    }
});

module.exports = router;
