import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

// Asegúrate de importar los estilos de Bootstrap en tu archivo principal (por ejemplo, index.js)
import 'bootstrap/dist/css/bootstrap.min.css';

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    // Simulando el fetch de noticias de los autobuses
    useEffect(() => {
        // Aquí puedes hacer una petición a tu API para obtener las noticias
        const fetchedNotifications = [
            {
                id: 1,
                message: '🚌 La parada de camión en la Avenida México no está funcionando hoy.',
                image: 'https://th.bing.com/th/id/OIP.6Vog0KMYoAN5qzVBmCpX-wHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7'
            },
            {
                id: 2,
                message: '⚠️ Servicio de autobuses retrasado por mantenimiento.',
                image: 'https://th.bing.com/th/id/OIP.41rqAQ5WTcFli8GWIDWC-AHaE8?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
            },
            {
                id: 3,
                message: '✅ Nueva ruta 15A disponible para tu destino.',
                image: 'https://binoticias.com/_next/image?url=https:%2F%2Fadmin.binoticias.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Frecorte_1200x800%2Fpublic%2Ffield-image%2F2024-03%2FNuevo%2520cami%25C3%25B3n.jpg%3Fitok%3DD6EuKo2X&w=3840&q=75'
            },
            {
                id: 4,
                message: '🚧 Cierre temporal de la ruta 7 por trabajos en la carretera.',
                image: 'https://www.heraldo.mx/wp-content/uploads/2016/08/aviso-vial-696x392.jpg'
            }
        ];
        setNotifications(fetchedNotifications);
    }, []);

    return (
        <div className="container mt-4">
            <h1>Notificaciones sobre Autobuses</h1>
            <div className="row">
                {notifications.map((notification) => (
                    <div key={notification.id} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img variant="top" src={notification.image} />
                            <Card.Body>
                                <Card.Text>{notification.message}</Card.Text>
                                <Button variant="primary">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsPage;
