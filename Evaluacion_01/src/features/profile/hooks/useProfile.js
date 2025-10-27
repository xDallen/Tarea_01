import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función que obtiene los datos del perfil del usuario
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await profileService.getProfile();
      setProfile(userProfile);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  // Ejecuta la carga del perfil al montar el componente
  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile
  };
};

// Hook personalizado para gestionar el estado del perfil de usuario
// Proporciona datos del perfil, estados de carga y error, y función para recargar
// Se usa en componentes que necesitan mostrar información del usuario autenticado