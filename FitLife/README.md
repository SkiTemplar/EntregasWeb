# FitLife - Formulario de Registro

## 📋 Descripción del Proyecto
Aplicación React para el registro de nuevos miembros en el gimnasio FitLife. 
El formulario está dividido en múltiples pasos para facilitar el proceso de registro.

## 🚀 Tecnologías Utilizadas
- React 18
- Vite (Build tool)
- react-hook-form (Gestión de formularios)
- react-icons (Iconos)
- CSS Modules (Estilos aislados)

## 📁 Estructura del Proyecto
```
FitLife/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Logo.jsx
│   │   ├── FormContainer.jsx
│   │   ├── PersonalDataForm.jsx
│   │   ├── ContactInfoForm.jsx
│   │   ├── TrainingPreferencesForm.jsx
│   │   ├── PaymentForm.jsx
│   │   ├── ProgressBar.jsx
│   │   └── SuccessMessage.jsx
│   ├── styles/              # Estilos CSS Modules
│   │   ├── Logo.module.css
│   │   ├── FormContainer.module.css
│   │   ├── Form.module.css
│   │   ├── ProgressBar.module.css
│   │   └── SuccessMessage.module.css
│   └── utils/               # Funciones auxiliares
│       ├── validations.js   # Validaciones
│       ├── constants.js     # Constantes
│       └── api.js           # Peticiones HTTP
```

## 🎯 Componentes Principales

### FormContainer
Componente principal que gestiona el estado global y la navegación entre formularios.

### Formularios (4 pasos):
1. **PersonalDataForm**: Nombre, email, teléfono
2. **ContactInfoForm**: Dirección, ciudad, código postal
3. **TrainingPreferencesForm**: Tipo de entrenamiento, objetivos, disponibilidad
4. **PaymentForm**: Método de pago, información de tarjeta

### ProgressBar
Muestra el progreso del usuario a través de los formularios.

### SuccessMessage
Mensaje de confirmación cuando el registro se completa.

## 🛠️ Requisitos Implementados

✅ Componentes reutilizables
✅ Props y State (useState)
✅ Manejo de eventos y validaciones
✅ Comunicación hijo-padre
✅ Condicionales y listas
✅ Aplicación de estilos (CSS Modules)
✅ Estilos dinámicos
✅ react-hook-form para gestión de formularios
✅ Peticiones HTTP simuladas

## 📝 Comandos Disponibles

### Iniciar servidor de desarrollo
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

### Vista previa de producción
```bash
npm run preview
```

## 🎨 Paleta de Colores (Sugerida)
- Principal: #1a73e8 (Azul FitLife)
- Secundario: #34a853 (Verde éxito)
- Acento: #fbbc04 (Amarillo energía)
- Error: #ea4335 (Rojo alerta)
- Fondo: #f8f9fa (Gris claro)

## 📚 Recursos
- [Documentación React](https://es.reactjs.org/docs/)
- [react-hook-form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 👨‍💻 Desarrollo
El proyecto utiliza react-hook-form para facilitar la validación de formularios.
Cada formulario se valida en tiempo real y muestra mensajes de error personalizados.

## 🔄 Flujo de Datos
1. Usuario completa formulario → validación con react-hook-form
2. Datos se envían al FormContainer (padre)
3. FormContainer almacena todos los datos
4. Al finalizar, se compone el objeto completo
5. Se envía al servidor mediante petición HTTP
6. Se muestra mensaje de éxito o error

