import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

// Reducer que maneja todos los estados de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        error: null,
        loading: false
      };
    case 'SET_USER':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload 
      };
    case 'CLEAR_AUTH_STATE':
      return { 
        ...state, 
        loading: false, 
        error: null 
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verifica autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = await authService.getProfile();
        dispatch({ type: 'SET_USER', payload: user });
      }
    } catch (error) {
      console.log('No hay usuario autenticado');
    }
  };

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authService.login(credentials);
      const user = await authService.getProfile();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authService.register(userData);
      dispatch({ type: 'CLEAR_AUTH_STATE' });
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const clearAuthState = () => {
    dispatch({ type: 'CLEAR_AUTH_STATE' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
    clearAuthState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Contexto de autenticación que provee estado global de usuario
// Maneja login, registro, logout y persistencia de sesión
// Incluye estados de carga, error y datos del usuario autenticado