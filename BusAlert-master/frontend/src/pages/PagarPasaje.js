import React, {useState,useEffect} from 'react';
import { useNavigate,  } from 'react-router-dom';
import '../components/RegistrarTarjeta.css';
import { Container } from 'react-bootstrap';


function PagarPasaje() {
    const navigate = useNavigate();
    const tarjeta = {
        folio: '1234567890',
        tipo: 'General',
        dueño: 'Juan Pérez',
    };
    const [mensaje, setMensaje] = useState('🔄 Esperando para pagar pasaje...');
    const [saldo, setSaldo] = useState(50); // Saldo inicial, puedes cambiarlo
    const costoPasaje = 10.5;

    useEffect(() => {
        // Después de 10 segundos, mostrar que se cobró el pasaje
        const timer1 = setTimeout(() => {
            setMensaje(`Se cobró $${costoPasaje}`);
            setSaldo((prevSaldo) => prevSaldo - costoPasaje); // Restar el costo del pasaje
        }, 4000);

        // Después de 2 segundos más, mostrar el saldo restante
        const timer2 = setTimeout(() => {
            setMensaje(`Saldo restante: $${(saldo - costoPasaje).toFixed(2)}`);
        }, 7000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <Container>
            <h1>Pagar Pasaje</h1>
            <h3  style={{ fontSize: '18px', fontWeight: 'bold', color: 'blue' }} >{mensaje}</h3>            
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
            <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
            </div>
        </Container>
    );
}

export default PagarPasaje;
