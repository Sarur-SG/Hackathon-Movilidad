const mongoose = require("mongoose");

const RutaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    chofer: { type: String, required: true },
    capacidadMaxima: { type: Number, required: true },
    ubicacionActual: { type: { lat: Number, lng: Number }, required: true },
    pasajerosActuales: { type: Number, default: 0 },
    estatus: { type: String, enum: ["disponible", "lleno", "en ruta"], default: "disponible" }
}, { timestamps: true });

module.exports = mongoose.model("Ruta", RutaSchema);
