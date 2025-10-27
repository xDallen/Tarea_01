# Sistema de Autenticación React

Un sistema completo de autenticación desarrollado en React con diseño moderno y funcionalidades robustas.

## 🚀 Características

- **Autenticación completa**: Registro, login y logout de usuarios
- **Diseño moderno**: Interfaz con Tailwind CSS y efectos glassmorphism
- **Gestión de estado**: Context API con useReducer para estado global
- **Rutas protegidas**: Sistema de protección de rutas privadas
- **Perfil de usuario**: Visualización elegante de datos del usuario
- **Responsive**: Diseño adaptable a todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- React 18
- React Router DOM
- Axios para peticiones HTTP
- Tailwind CSS para estilos
- Lucide React para iconos
- Context API para estado global

## 📁 Estructura del Proyecto

```
src/
├── auth/
│   ├── context/
│   │   └── AuthContext.js          # Contexto de autenticación
│   ├── services/
│   │   └── authService.js          # Servicio de autenticación
│   └── pages/
│       ├── Login.js               # Página de inicio de sesión
│       └── Register.js            # Página de registro
├── profile/
│   ├── hooks/
│   │   └── useProfile.js          # Hook personalizado para perfil
│   ├── services/
│   │   └── profileService.js      # Servicio de perfil
│   └── pages/
│       └── Profile.js             # Página de perfil
├── components/
│   └── ProtectedRoute.js          # Componente de ruta protegida
└── App.js                         # Configuración principal de rutas
```

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env
   REACT_APP_API_URL=https://reflexoperu-v3.marketingmedico.vip/backend/public/api
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm start
   ```

## 🎯 Funcionalidades Principales

### Autenticación
- **Registro**: Formulario completo con validación de datos
- **Login**: Inicio de sesión con manejo de tokens
- **Logout**: Cierre seguro de sesión
- **Persistencia**: Mantiene sesión al recargar la página

### Perfil de Usuario
- **Datos personales**: Nombre, email, teléfono, username
- **Información adicional**: País, ID de usuario, última sesión
- **Avatar**: Imagen de perfil o iniciales automáticas
- **Diseño responsive**: Tarjeta elegante con gradientes

### Seguridad
- **Rutas protegidas**: Acceso restringido a usuarios autenticados
- **Tokens JWT**: Manejo automático de tokens de autenticación
- **Interceptores**: Manejo automático de errores 401

## 🔄 Flujo de la Aplicación

1. **Usuario no autenticado**: 
   - Accede a `/login` o `/register`
   - Se redirige automáticamente al login

2. **Registro**:
   - Completa formulario en `/register`
   - Redirección automática a login con email prellenado

3. **Login**:
   - Ingresa credenciales en `/login`
   - Redirección automática a `/profile`

4. **Perfil**:
   - Visualiza información personal
   - Opción de cerrar sesión

## 🎨 Diseño y UX

- **Gradientes**: Fondos con gradientes azul-índigo
- **Glassmorphism**: Efectos de vidrio esmerilado
- **Iconos**: Lucide React para consistencia visual
- **Responsive**: Grid system adaptable
- **Estados**: Loading y error con diseño amigable

## 🔐 Servicios de API

### Auth Service
```javascript
// Funciones disponibles
authService.register(userData)    // Registrar usuario
authService.login(credentials)    // Iniciar sesión
authService.logout()             // Cerrar sesión
authService.getProfile()         // Obtener perfil
```

### Profile Service
```javascript
// Función principal
profileService.getProfile()      // Obtener datos del perfil
```

## 🧩 Hooks Personalizados

### useAuth
```javascript
// Provee estado de autenticación global
const { isAuthenticated, user, login, register, logout } = useAuth();
```

### useProfile
```javascript
// Maneja datos del perfil del usuario
const { profile, loading, error, refetch } = useProfile();
```

## 🚦 Componentes Principales

### ProtectedRoute
Protege rutas que requieren autenticación:
```javascript
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

### AuthProvider
Envuelve la aplicación para proveer contexto de autenticación.

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptable a tablet y desktop
- **Grid System**: Layouts flexibles con CSS Grid

## 🛡️ Manejo de Errores

- Validación de formularios en frontend
- Manejo de errores de API
- Mensajes de error amigables para usuarios
- Logging detallado para desarrollo

## 🔄 Estados de la Aplicación

- **Loading**: Indicadores durante peticiones
- **Error**: Manejo elegante de errores
- **Success**: Confirmaciones de acciones exitosas

## 📦 Scripts Disponibles

```bash
npm start      # Ejecutar en desarrollo
npm run build  # Crear build de producción
npm test       # Ejecutar tests
```

## 🌐 Deployment

La aplicación está configurada para deployment en cualquier servicio compatible con React:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ usando React y Tailwind CSS**
