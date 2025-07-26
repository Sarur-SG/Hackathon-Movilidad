import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import "../pages/Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();  // Para verificar la redirección desde el registro


  useEffect(() => {
    if (location.state?.fromRegister) {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegistering
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const response = await axios.post(url, { nombre: name, correo: email, password });

      if (isRegistering) {
        alert('Registro exitoso! Ahora puedes iniciar sesión.');
        navigate('/', { state: { fromRegister: true } });  // Enviamos el estado al login
        return;
      }
      localStorage.setItem('token', response.data.token); // Asegúrate de que 'response.data.token' sea el token que se recibe
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/Dashboard');
    } catch (err) {
      setError('Error en el proceso, revisa los datos');
    }
  };

  return (
    <Container className="container-background">
    <Card className="card p-4">
      <div id="striped-border top-border"></div>
      <h2 id="text-center">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {isRegistering && (
          <Form.Group id="input-group">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
        )}
        <Form.Group id="input-group">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group id="input-group">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" id="btn">
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </Button>
      </Form>
      <div id="register-link">
        <Button className="button-link" variant="link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
        </Button>
      </div>
      <div id="striped-border bottom-border"></div>
    </Card>
  </Container>
  );
}

export default Login;
