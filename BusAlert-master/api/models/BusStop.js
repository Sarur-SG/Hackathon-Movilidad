// models/BusStop.js

const mongoose = require('mongoose');

// Definir el esquema para las paradas de autobús
const busStopSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la parada
    lat: { type: Number, required: true },  // Latitud
    lng: { type: Number, required: true },  // Longitud
    address: { type: String, required: true }, // Dirección de la parada
    routes: [{ type: String }], // Rutas de autobús que pasan por la parada
}, { timestamps: true }); // Añadir timestamps para saber cuándo fue creado y actualizado

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
