import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RecargarTarjeta.css";
import oxxoImg from '../images/oxxo.png';
import tarjetaImg from '../images/tarjeta.png';
import nfcImg from '../images/nfc.png';


function RecargarTarjeta() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('OXXO');
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    // Simulación de una solicitud para recargar la tarjeta
    try {

      const response = await fetch('http://localhost:5000/api/tarjetas/recargar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Pasar el token para verificar al usuario
        },
        body: JSON.stringify({
            monto: parseFloat(amount),
          }),
      });

      const data = await response.json();
      if (data.message === 'Recarga exitosa') {
        alert('¡Recarga exitosa!');
        navigate('/dashboard');  // Redirigir al dashboard
      } else {
        alert('Hubo un problema con la recarga');
      }
    } catch (error) {
      console.error('Error al procesar la recarga:', error);
      alert('Hubo un error al procesar la recarga');
    }
  };

  return (
    <div className='recarga-div'>
      <h1 className='recarga'>Recargar Tarjeta</h1>
      <form onSubmit={handleSubmit} className='recarga-form'>
        <div className='form-group'>
          <label className='monto-recarga'>Monto de la recarga:</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Monto a recargar"
            required
          />
        </div>
        <div className="metodo-pago-container">
          <p >Selecciona el método de pago:</p>
          <div className="metodo-pago-options">
            <div 
              className={`metodo-pago-item ${paymentMethod === "OXXO" ? "selected" : ""}`} 
              onClick={() => setPaymentMethod("OXXO")}
            >
              <img src={oxxoImg} alt="OXXO" />
              <p>OXXO</p>
            </div>
            <div 
              className={`metodo-pago-item ${paymentMethod === "Tarjeta" ? "selected" : ""}`} 
              onClick={() => setPaymentMethod("Tarjeta")}
            >
              <img src={tarjetaImg} alt="Tarjeta" />
              <p>Tarjeta</p>
            </div>
            <div 
              className={`metodo-pago-item ${paymentMethod === "NFC" ? "selected" : ""}`} 
              onClick={() => setPaymentMethod("NFC")}
            >
              <img src={nfcImg} alt="NFC" />
              <p>NFC</p>
            </div>
          </div>
        </div>
        <button className='botton-recarga' type="submit">Recargar</button>
      </form>
       {/* Siempre muestra la tarjeta, aunque no esté registrada */}
       <div className="tarjeta-container">
                <div className="tarjeta ">
                    {/* Parte delantera de la tarjeta */}
                    <div className="border-deco top"></div>
                    <div className="header">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="https://seeklogo.com/images/E/escudo-del-estado-de-aguascalientes-logo-71B8D64F73-seeklogo.com.png" alt="Logo Aguascalientes" />
                            <div>
                                <strong>Aguascalientes</strong><br />
                                Gente de trabajo
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <strong>GOBIERNO DEL ESTADO<br />DE AGUASCALIENTES</strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            El<br /><strong>gigante</strong><br />de México
                        </div>
                    </div>
                    <div className="soluciones">
                        SO<span className="l">L</span>UC<span className="i">I</span>ONES
                    </div>
                    <div className="yovoy">YOVOY</div>
                    <div className="border-deco bottom"></div>
                    {/* Parte trasera de la tarjeta */}
                    <div className="tarjeta-trasera">
                        <p>Información confidencial</p>
                        {/* Puedes incluir otros detalles de seguridad o instrucciones */}
                    </div>
                </div>
            </div>
    </div>
  );
}
  
export default RecargarTarjeta;
