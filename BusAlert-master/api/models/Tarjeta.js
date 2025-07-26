const mongoose = require("mongoose");

const TarjetaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    folio: { type: String, unique: true },
    saldo: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Tarjeta", TarjetaSchema);
