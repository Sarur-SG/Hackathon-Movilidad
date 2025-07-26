const express = require("express");
const router = express.Router();
const BusLocation = require("../models/BusLocation");

// Obtener ubicaciones de todos los autobuses
router.get("/buses", async (req, res) => {
    try {
        const buses = await BusLocation.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener ubicaciones" });
    }
});

// Crear o actualizar la ubicación de un autobús
router.post("/ubicacionBus", async (req, res) => {
    const { busId, lat, lng, driverName, rating } = req.body;

    // Validación de datos
    if (!busId || !lat || !lng || !driverName || rating === undefined) {
        return res.status(400).json({ error: "Faltan datos para la ubicación del autobús" });
    }

    try {
        // Buscar y actualizar la ubicación del autobús, o crear uno nuevo
        const busLocation = await BusLocation.findOneAndUpdate(
            { busId },
            { lat, lng, driverName, rating },
            { upsert: true, new: true } // upsert: true crea un nuevo registro si no existe
        );

        res.status(200).json(busLocation); // Devolver la ubicación del autobús
    } catch (error) {
        res.status(500).json({ error: "Error al guardar la ubicación" });
    }
});


module.exports = router;
