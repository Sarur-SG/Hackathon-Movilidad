const express = require('express');
const PaymentMethod = require('../models/PaymentMethod');  // Modelo de pago

const router = express.Router();

// Ruta para registrar un método de pago
router.post('/register', async (req, res) => {
    const { method, cardNumber, expiryMonth, expiryYear, cvc, paypalEmail } = req.body;

    try {
        const newPaymentMethod = new PaymentMethod({
            method,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvc,
            paypalEmail,
        });

        await newPaymentMethod.save();
        res.status(201).json({ message: 'Método de pago registrado con éxito', paymentMethod: newPaymentMethod });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el método de pago' });
    }
});

// Ruta para obtener todos los métodos de pago
router.get('/', async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json(paymentMethods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los métodos de pago' });
    }
});

module.exports = router;
