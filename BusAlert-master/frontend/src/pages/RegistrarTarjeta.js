import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/RegistrarTarjeta.css'; // Importar el archivo CSS para la tarjeta
import './RegistrarTarjeta.css'

function RegistrarTarjeta() {
    const [error, setError] = useState('');
    const [tarjeta, setTarjeta] = useState({
        folio: '1234567890',
        tipo: 'General',
        dueño: 'Juan Pérez',
    }); // Valores predeterminados para mostrar la tarjeta sin importar si está registrada
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No estás autenticado');
            return;
        }

        try {
            // Hacer la petición para registrar la tarjeta, enviando el token en los headers
            const response = await axios.post('http://localhost:5000/api/tarjetas/registrar', { usuarioId: localStorage.getItem('usuarioId') }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Pasamos el token en los headers
                }
            });

            if (response.status === 201) {
                // Si la tarjeta se registra correctamente, actualizamos el estado para mostrar la tarjeta
                setTarjeta(response.data); // Suponiendo que la respuesta incluye la tarjeta registrada
                // Redirige al dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            // Comprobar si el error es debido a una tarjeta ya registrada
            if (error.response && error.response.status === 400 && error.response.data.error === "El usuario ya tiene una tarjeta registrada") {
                setError("Ya tienes una tarjeta registrada.");
            } else {
                setError('Error al registrar la tarjeta');
            }
        }          
        };

    return (
        <div className="container">
            <h1>Registrar Tarjeta</h1>         

            {/* Siempre muestra la tarjeta, aunque no esté registrada */}
            <div className="tarjeta-container">
                <div className="tarjeta">
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
            <div className='mt-3'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <button type="submit">Registrar</button>
            </form>
            </div>
        </div>
    );
}

export default RegistrarTarjeta;
