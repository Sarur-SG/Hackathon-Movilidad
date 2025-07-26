const User = require('../models/User');
const Payment = require('../models/Payment');

// Función para simular una recarga de saldo
const updateUserBalance = async (req, res) => {
    const { userId, amount, paymentMethod } = req.body;

    try {
        // Crear un ID de transacción simulado (por ejemplo, con un UUID aleatorio o un simple hash)
        const transactionId = `trans_${Math.random().toString(36).substr(2, 9)}`;

        // Crear el registro de pago en la base de datos con el estado simulado como 'completed'
        const payment = new Payment({
            userId,
            amount,
            paymentMethod,
            transactionId,
            status: 'completed'  // Simulamos que la transacción siempre fue exitosa
        });
        await payment.save();

        // Actualizar el saldo del usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.balance += amount; // Sumar la recarga al saldo
        await user.save();

        res.json({ message: 'Recarga exitosa' });
    } catch (error) {
        console.error('Error al actualizar saldo:', error);
        res.status(500).json({ error: 'Error al procesar la recarga' });
    }
};

module.exports = { updateUserBalance };
