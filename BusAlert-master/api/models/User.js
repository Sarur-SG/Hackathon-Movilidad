const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nfc: { type: mongoose.Schema.Types.ObjectId, default: function() { return this._id; }, unique: true, sparse: true },
    tipo: { type: String, enum: ["estudiante", "adultoMayor", "discapacidad", "general"], default: "general" },
}, { timestamps: true });

// Encriptar contraseña antes de guardar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
UserSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model("User", UserSchema);
