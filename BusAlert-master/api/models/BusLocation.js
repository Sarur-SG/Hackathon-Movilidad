    const mongoose = require("mongoose");

    const BusLocationSchema = new mongoose.Schema({
        busId: { type: String, required: true, unique: true }, // ID del autobús
        lat: { type: Number, required: true },  // Latitud
        lng: { type: Number, required: true },  // Longitud
        driverName: { type: String, required: true }, // Nombre del chofer
        rating: { type: Number, required: true, min: 0, max: 5 }, // Calificación del chofer (0-5)
    }, { timestamps: true });

    module.exports = mongoose.model("BusLocation", BusLocationSchema);
