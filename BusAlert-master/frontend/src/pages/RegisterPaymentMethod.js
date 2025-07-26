import React, { useState } from 'react';
import axios from 'axios';  // Importamos axios
import './RegistrarPaymentMethod.css';
import visaLogo from '../images/paypal.png'
import paypalLogo from '../images/visa.png'
import mercadopago from '../images/mercadopago.png'

function RegisterPaymentMethod() {
    const [method, setMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [mercadoPagoEmail, setMercadoPagoEmail] = useState('');
    const [cvc, setCvc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creamos el objeto de datos que enviaremos al backend
        const paymentData = {
            method,
            cardNumber,
            paypalEmail,
            expiryMonth,
            expiryYear,
            cvc,
        };

        try {
            // Hacemos la solicitud POST al backend para registrar el método de pago
            const response = await axios.post('http://localhost:5000/api/payment/register', paymentData);

            // Puedes manejar la respuesta del backend aquí
            alert('Método de pago registrado con éxito');
            console.log(response.data);
        } catch (error) {
            // Manejo de errores en caso de que falle la solicitud
            console.error('Error al registrar el método de pago:', error);
            alert('Hubo un error al registrar el método de pago');
        }
    };

    return (
        <div className="container-register">
          <h1 className="title-method">Registrar Método de Recarga</h1>
          <form onSubmit={handleSubmit}>
            <div className="payment-options">
              <label className={`payment-option ${method === "Visa" ? "selected" : ""}`}
                onClick={() => setMethod("Visa")}
              >
                <img src={visaLogo} alt="Visa" />
              </label>
              <label className={`payment-option ${method === "PayPal" ? "selected" : ""}`}
                onClick={() => setMethod("PayPal")}
              >
                <img src={paypalLogo} alt="PayPal" />
              </label>
              <label className={`payment-option ${method === "MercadoPago" ? "selected" : ""}`}
            onClick={() => setMethod("MercadoPago")}
                >
            <img src={mercadopago} alt="MercadoPago" />
            </label> 
            </div>
    
            {method === "Visa" && (
              <div className="visa-details">
                <label className='number-target'>Número de tarjeta Visa:</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                />
    
                <div>
                  <label className='month-cadud'>Mes de caducidad:</label>
                  <input
                    type="text"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    placeholder="MM"
                    maxLength="2"
                  />
                </div>
    
                <div>
                  <label className='year-cadud'>Año de caducidad:</label>
                  <input
                    type="text"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    placeholder="AAAA"
                    maxLength="4"
                  />
                </div>
    
                <div>
                  <label className='cvc'>CVC:</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="XXX"
                    maxLength="3"
                  />
                </div>
                
              </div>
            )}
    
            {method === "PayPal" && (
              <div className="paypal-details">
                <label className='email-paypal'>Correo de PayPal:</label>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="tuemail@paypal.com"
                />
              </div>
            )}
            {method === "MercadoPago" && (
                  <div className="visa-details">
                  <label className='number-target'>Número de tarjeta MercadoPago:)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
      
                  <div>
                    <label className='month-cadud'>Mes de caducidad:</label>
                    <input
                      type="text"
                      value={expiryMonth}
                      onChange={(e) => setExpiryMonth(e.target.value)}
                      placeholder="MM"
                      maxLength="2"
                    />
                  </div>
      
                  <div>
                    <label className='year-cadud'>Año de caducidad:</label>
                    <input
                      type="text"
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value)}
                      placeholder="AAAA"
                      maxLength="4"
                    />
                  </div>
      
                  <div>
                    <label className='cvc'>CVC:</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="XXX"
                      maxLength="3"
                    />
                  </div>
                  
                </div>
                )}
    
            <button className="button-method" type="submit">Registrar Método</button>
          </form>
        </div>

        
      );
    }
    
    export default RegisterPaymentMethod;