import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Muestra loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Espere...</div>
      </div>
    );
  }

  // Si está autenticado muestra el contenido, sino redirige al login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// Componente que protege rutas privadas verificando autenticación
// Usa el contexto de auth para determinar si el usuario puede acceder
// Muestra loading durante la verificación y redirige al login si no está autenticado