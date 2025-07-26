import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import './ChatbotPage.css'

function ChatbotPage() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy? Elige una opción:' },
    ]);
    const [userInput, setUserInput] = useState('');

    const handleOptionClick = (option) => {
        // Añadir la opción seleccionada al chat
        const newMessages = [...messages, { sender: 'user', text: option }];
        setMessages(newMessages);

        // Simular la respuesta del bot basada en la opción seleccionada
        let botResponse = 'Lo siento, no entendí eso.';

        if (option.toLowerCase() === 'saldo') {
            botResponse = 'Tu saldo actual es $100.';
        } else if (option.toLowerCase() === 'movimientos') {
            botResponse = 'Tus últimos movimientos fueron: Recarga de $50 hace 2hrs, Recarga de $20 hace 3 días.';
        } else if (option.toLowerCase() === 'reporte') {
            botResponse = '¿Qué tipo de reporte necesitas?';
        } else if (option.toLowerCase() === 'tramites') {
            botResponse = '¿Qué tipo de tarjeta deseas tramitar?';
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botResponse },
        ]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        // Añadir el mensaje del usuario al chat
        const newMessages = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);

        // Simular la respuesta del bot después de escribir
        setUserInput('');

        setTimeout(() => {
            let botResponse = 'Lo siento, no entendí eso.';

            if (userInput.toLowerCase().includes('saldo')) {
                botResponse = 'Tu saldo actual es $100.';
            } else if (userInput.toLowerCase().includes('movimientos')) {
                botResponse = 'Tus últimos movimientos fueron: Recarga de $50 hace 2hrs, Recarga de $20 hace 3 días.';
            } else if (userInput.toLowerCase().includes('reporte')) {
                botResponse = '¿Qué tipo de reporte necesitas?';
            } else if (userInput.toLowerCase().includes('tramites')) {
                botResponse = '¿Qué tipo de tarjeta deseas tramitar?';
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: botResponse },
            ]);
        }, 1000); // Simula el tiempo de respuesta del bot
    };

    return (
        <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
            <h2>Chatbot de Soporte</h2>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{message.sender === 'bot' ? 'Bot: 🤖' : 'Tú: 🧑‍💻'}</strong>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            {/* Opciones del bot cuando se le pregunta por ayuda */}
            {(messages.length === 1 || messages[messages.length - 1].sender === 'bot') && (
                <div style={{ marginTop: '10px' }}>
                    <Button className="button-saldo" variant="light" onClick={() => handleOptionClick('saldo')}>
                        Consultar Saldo
                    </Button>{' '}
                    <Button className="button-movimientos"  variant="light" onClick={() => handleOptionClick('movimientos')}>
                        Ver Movimientos
                    </Button>{' '}
                    <Button className="button-reporte"   variant="light" onClick={() => handleOptionClick('reporte')}>
                        Reporte
                    </Button>{' '}
                    <Button className="button-tramites"   variant="light" onClick={() => handleOptionClick('tramites')}>
                        Trámites
                    </Button>
                </div>
            )}

            {/* Campo de texto para mensaje personalizado */}
            <Form onSubmit={handleSendMessage} style={{ marginTop: '20px' }}>
                <Form.Group controlId="userMessage">
                    <Form.Control
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                </Form.Group>
                <Button className="button-enviar" variant="primary" type="submit" style={{ marginTop: '10px' }}>
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}

export default ChatbotPage;
