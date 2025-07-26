    const jwt = require("jsonwebtoken");
    const User = require("../models/User");

    const verificarToken = async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];

                // Decodificar token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.usuario = await User.findById(decoded.id).select("-password");

                if (!req.usuario) {
                    return res.status(404).json({ error: "Usuario no encontrado" });
                }

                next();
            } catch (error) {
                res.status(401).json({ error: "Token inválido o expirado" });
            }
        } else {
            res.status(401).json({ error: "No autorizado, no hay token" });
        }
    };

    module.exports = verificarToken;
