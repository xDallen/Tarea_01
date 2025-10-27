import axios from 'axios';

const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor que agrega automáticamente el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor que maneja errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    try {
      console.log('📤 Enviando datos al backend:', JSON.stringify(userData, null, 2));
      const response = await api.post('/register', userData);
      console.log('✅ Registro exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error COMPLETO del backend:');
      console.error('Mensaje:', error.response?.data?.message);
      console.error('Errores específicos:', error.response?.data?.errors);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.delete('/logout');
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      console.error('Error en logout:', error.response?.data);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error.response?.data);
      throw error;
    }
  }
};

export default api;

// Servicio de autenticación que se conecta a backend real con Axios
// Incluye interceptores para manejo automático de tokens y errores 401
// Proporciona funciones completas para registro, login, logout y obtención de perfil
// Maneja logging detallado para debugging y desarrollo