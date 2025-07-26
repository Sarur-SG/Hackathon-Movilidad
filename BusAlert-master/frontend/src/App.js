import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import RecargarTarjeta from './pages/RecargarTarjeta';
import RegistrarTarjeta from './pages/RegistrarTarjeta';
import RegisterPaymentMethod from './pages/RegisterPaymentMethod';
import NotificationsPage from './pages/NotificationsPage';
import PagarPasaje from './pages/PagarPasaje';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/recargar-tarjeta" element={<RecargarTarjeta />} />
        <Route path="/registrar-tarjeta" element={<RegistrarTarjeta />} /> {/* Ruta para registrar tarjeta */}
        <Route path="/registrar-metodo" element={<RegisterPaymentMethod />} />
        <Route path="/notificaciones" element={<NotificationsPage />} />
        <Route path="/pagar-pasaje" element={<PagarPasaje/>} />
        <Route path="/chatbot" element={<ChatbotPage />} />  {/* Ruta del chatbot */}


      </Routes>

  );
}

export default App;
