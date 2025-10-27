import api from '../../auth/services/authService';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};

// Servicio especializado para obtener datos del perfil de usuario
// Utiliza la instancia configurada de axios que incluye autenticación automática
// Retorna directamente los datos del perfil para uso en componentes y hooks