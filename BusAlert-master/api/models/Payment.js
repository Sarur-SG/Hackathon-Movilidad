// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relacionado con el usuario
    amount: { type: Number, required: true }, // Monto de la recarga
    paymentMethod: { type: String, required: true }, // Método de pago (OXXO, tarjeta, NFT)
    transactionId: { type: String, required: true }, // ID de la transacción (provisto por MercadoPago, Web3, etc.)
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Estado de la transacción
    date: { type: Date, default: Date.now } // Fecha de la transacción
});

module.exports = mongoose.model("Payment", PaymentSchema);
