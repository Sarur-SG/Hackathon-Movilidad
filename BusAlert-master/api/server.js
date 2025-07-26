require('dotenv').config();
const express = require('express');
const http = require('http'); // Importar módulo HTTP
const socketIo = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');
const { createPayment } = require('./controllers/paymentController'); // Asegúrate de que la ruta sea correcta
const stopRoutes = require('./routes/stops');
const updateUserBalance = require ("./controllers/updateUserBalance ")
const axios = require("axios")
const { PythonShell } = require('python-shell'); // Importar python-shell
const BusLocation = require("./models/BusLocation");
const { Storage } = require('@google-cloud/storage');
const paymentRoutes = require('./routes/paymentRoutes');




const app = express();
const server = http.createServer(app); // Crear servidor HTTP


// Middlewares
app.use(cors());
app.use(express.json());
const io = socketIo(server, {
    cors: { origin: "*" }
});
app.use(express.urlencoded({ extended: true })); 


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 Conectado a MongoDB"))
    .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

io.on("connection", (socket) => {
    console.log("🟢 Nuevo cliente conectado");

    // 🚍 Recibir ubicación de autobús
    socket.on("ubicacionBus", async (data) => {
        const { busId, lat, lng, pasajerosEsperando } = data;

        try {
            // Guardar ubicación en MongoDB
            await BusLocation.findOneAndUpdate(
                { busId },
                { lat, lng, pasajerosEsperando },
                { upsert: true, new: true }
            );

            // Enviar actualización a todos los clientes
            io.emit("actualizarUbicaciones", data);
        } catch (error) {
            console.error("❌ Error al guardar ubicación:", error);
        }
    });

    // Cuando un usuario se desconecta
    socket.on("disconnect", () => {
        console.log("🔴 Cliente desconectado");
    });
});

// Rutas de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Usar `server.listen` en lugar de `app.listen`
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tarjetas", require("./routes/tarjetaRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));
app.post("/api/location", require("./routes/locationRoutes"));
app.post('/api/payment', createPayment);
app.use('/api/stops', stopRoutes);
app.get('/api/place/details', async (req, res) => {
    const { place_id } = req.query;
    const API_KEY = "AIzaSyDkCXkdamNXTN3uZyM_7o7sWobnf-Ml6mA";

    try {
        console.log("Solicitud recibida para place_id:", place_id); // 📌 Verifica qué ID llega

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
            params: { place_id, key: API_KEY },
        });

        console.log("Respuesta de Google:", response.data); // 📌 Muestra la respuesta en consola

        if (response.data.status !== "OK") {
            return res.status(400).json({ error: response.data.status, message: response.data.error_message });
        }

        res.json(response.data.result); // 📌 Enviamos solo la info relevante al frontend
    } catch (error) {
        console.error("Error en la API:", error.response?.data || error.message);
        res.status(500).json({ error: "Error interno en el servidor", details: error.message });
    }
});
app.use("/api/payment", paymentRoutes);






