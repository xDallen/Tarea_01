import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Globe, Shield, Hash, LogOut, Calendar } from "lucide-react";

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Genera iniciales para el avatar si no hay imagen
  const getInitials = (name = "", paternal = "") =>
    `${name.charAt(0) || ""}${paternal.charAt(0) || ""}`.toUpperCase();

  // Estado de carga con spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-lg rounded-xl px-6 py-4 shadow-lg border border-white/60">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 text-sm font-medium">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Estado de error con opción de reintentar
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-red-50/80 backdrop-blur-lg border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {profile.image_url ? (
                  <img
                    src={profile.image_url}
                    alt="Foto de perfil"
                    className="w-28 h-28 rounded-full border-4 border-white/80 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/80 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {getInitials(profile.name, profile.paternal_lastname)}
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">
                {profile.name} {profile.paternal_lastname} {profile.maternal_lastname}
              </h1>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
                <Shield className="w-4 h-4 text-white/90 mr-2" />
                <span className="text-white/90 text-sm font-medium">
                  {profile.role?.name || "Usuario"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Información Personal
                </h2>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 p-5 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">Correo Electrónico</p>
                      <p className="text-sm text-gray-800 font-medium truncate">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                      <p className="text-sm text-gray-800 font-medium">
                        {profile.phone || "No registrado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">Nombre de Usuario</p>
                      <p className="text-sm text-gray-800 font-medium">@{profile.user_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-indigo-600" />
                  Información Adicional
                </h2>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 p-5 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">País</p>
                      <p className="text-sm text-gray-800 font-medium">
                        {profile.country?.name || "No disponible"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Hash className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">ID de Usuario</p>
                      <p className="text-sm text-gray-800 font-mono font-medium">{profile.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">Última Sesión</p>
                      <p className="text-sm text-gray-800 font-medium">
                        {profile.last_session ? new Date(profile.last_session).toLocaleDateString('es-ES') : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60 flex justify-center">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Página de perfil de usuario con diseño moderno y elegante
// Muestra información personal y datos de cuenta del usuario autenticado
// Incluye manejo de estados de carga y error con interfaces amigables
// Diseño responsive con efectos glassmorphism y gradientes atractivos