const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        enum: ['Visa', 'PayPal'],
    },
    cardNumber: {
        type: String,
        required: function () {
            return this.method === 'Visa';
        },
    },
    expiryMonth: {
        type: String,
        required: function () {
            return this.method === 'Visa';
        },
    },
    expiryYear: {
        type: String,
        required: function () {
            return this.method === 'Visa';
        },
    },
    cvc: {
        type: String,
        required: function () {
            return this.method === 'Visa';
        },
    },
    paypalEmail: {
        type: String,
        required: function () {
            return this.method === 'PayPal';
        },
    },
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;
