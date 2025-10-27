import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Profile from './features/profile/pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


/* Configuración principal de rutas de la aplicación:

- **AuthProvider**: Provee contexto de autenticación global
- **Rutas públicas**: /login y /register
- **Ruta protegida**: /profile (requiere autenticación)
- **Redirecciones**: / y rutas no definidas van a /profile
- **ProtectedRoute**: Componente que protege rutas privadas

Estructura: Login y Register públicos, Profile protegido, redirección automática al perfil. */