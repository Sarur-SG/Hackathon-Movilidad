const mercadopago = require('mercadopago');

// Configurar MercadoPago con el Access Token
const client = new mercadopago.MercadoPagoConfig({
    accessToken: 'TU_ACCESS_TOKEN' // Sustituye con tu access token real
});

const paymentClient = new mercadopago.Payment(client);

// Controlador para crear un pago
const createPayment = async (req, res) => {
    const { amount, email } = req.body; // Cantidad y correo del usuario

    // Configuración del pago
    const payment_data = {
        transaction_amount: amount,
        description: 'Recarga de saldo',
        payment_method_id: 'oxxo', // Puedes cambiarlo por el método de pago que elijas
        payer: {
            email: email
        }
    };

    try {
        const payment = await paymentClient.create({ body: payment_data });
        res.json({ payment_url: payment.response.init_point }); // URL para redirigir al usuario para pagar
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
};

module.exports = { createPayment };
