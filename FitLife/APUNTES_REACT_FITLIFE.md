  setFormData({
    ...formData,
    [step]: data
  })
}

// Resultado:
// formData.personalData = { nombre: "...", email: "..." }
```

**3. FormContainer avanza paso:**
```javascript
const handleNextStep = () => {
  setCurrentStep(currentStep + 1)  // 1 → 2
}

// Renderizado condicional muestra siguiente formulario
{currentStep === 2 && <ContactInfoForm />}
```

**4. Último paso - Envío final:**
```javascript
// PaymentForm.jsx
const onSubmitForm = (data) => {
  onSubmit(data)  // Llama a handleFinalSubmit
}

// FormContainer.jsx
const handleFinalSubmit = async (paymentData) => {
  const finalData = {
    ...formData,
    payment: paymentData
  }
  
  setIsLoading(true)
  const result = await mockSubmitRegistration(finalData)
  setIsLoading(false)
  
  if (result.success) {
    setIsSubmitted(true)  // Cambia a true
  }
}

// Como isSubmitted es true:
if (isSubmitted) {
  return <SuccessMessage userData={formData} />
}
```

### Objeto Final

```javascript
{
  personalData: {
    nombre: "Juan",
    email: "juan@example.com",
    telefono: "123456789"
  },
  contactInfo: {
    direccion: "Calle Principal 123",
    ciudad: "Madrid",
    codigoPostal: "28001"
  },
  trainingPreferences: {
    tipoEntrenamiento: "Cardio",
    objetivo: "Pérdida de peso",
    disponibilidad: "Mañana"
  },
  payment: {
    metodoPago: "Tarjeta de crédito",
    numeroTarjeta: "1234567890123456"
  }
}
```

---

## 📊 TABLA RESUMEN

| Concepto | ¿Para qué sirve? | Ejemplo |
|----------|------------------|---------|
| **useState** | Guardar datos que cambian | `const [count, setCount] = useState(0)` |
| **Props** | Pasar datos padre → hijo | `<Hijo nombre="Juan" />` |
| **Eventos** | Responder a acciones | `onClick={handleClick}` |
| **Condicional** | Mostrar/ocultar | `{isLogged && <Dashboard />}` |
| **.map()** | Crear listas | `{items.map(i => <li>{i}</li>)}` |
| **react-hook-form** | Gestionar formularios | `const { register } = useForm()` |
| **CSS Modules** | CSS local | `import styles from './App.module.css'` |

---

## 🎓 PATRONES CLAVE

### 1. Comunicación Hijo → Padre

```javascript
// PADRE
function Padre() {
  const recibirDatos = (datos) => {
    console.log(datos)
  }
  
  return <Hijo onEnviar={recibirDatos} />
}

// HIJO
function Hijo({ onEnviar }) {
  const enviar = () => {
    onEnviar({ nombre: "Juan" })
  }
  
  return <button onClick={enviar}>Enviar</button>
}
```

### 2. Formulario Multi-Paso

```javascript
function FormMultiPaso() {
  const [paso, setPaso] = useState(1)
  const [datos, setDatos] = useState({})
  
  const guardar = (nuevosDatos) => {
    setDatos({ ...datos, ...nuevosDatos })
  }
  
  return (
    <>
      {paso === 1 && <Paso1 onNext={() => setPaso(2)} onSave={guardar} />}
      {paso === 2 && <Paso2 onBack={() => setPaso(1)} onSave={guardar} />}
    </>
  )
}
```

---

## 🐛 ERRORES COMUNES

### 1. Leer propiedad de undefined

```javascript
// ❌ MAL
<p>{userData.nombre}</p>

// ✅ BIEN - Optional chaining
<p>{userData?.nombre}</p>
```

### 2. Modificar estado directamente

```javascript
// ❌ MAL
user.nombre = "Pedro"

// ✅ BIEN
setUser({ ...user, nombre: "Pedro" })
```

### 3. Olvidar key en listas

```javascript
// ❌ MAL
{items.map(item => <li>{item}</li>)}

// ✅ BIEN
{items.map((item, i) => <li key={i}>{item}</li>)}
```

### 4. Ejecutar función en evento

```javascript
// ❌ MAL
<button onClick={handleClick()}>

// ✅ BIEN
<button onClick={handleClick}>
```

---

## 🔍 GLOSARIO

- **Componente**: Función que retorna JSX
- **JSX**: HTML en JavaScript
- **Estado**: Datos que pueden cambiar
- **Props**: Datos de padre a hijo
- **Hook**: Función especial de React (useState, useForm)
- **Renderizado**: Convertir componentes en HTML
- **Evento**: Acción del usuario (click, submit)
- **CSS Modules**: CSS local a un componente
- **Spread Operator (...)**: Copiar objeto/array
- **Arrow Function**: `() => {}`
- **Template String**: `` `Hola ${nombre}` ``

---

## 🚀 COMANDOS

```bash
# Crear proyecto
npm create vite@latest mi-proyecto -- --template react

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Instalar librerías
npm install react-hook-form
npm install react-icons
```

---

## ✅ CHECKLIST

- [ ] ¿Qué es un componente?
- [ ] ¿Cómo usar useState?
- [ ] ¿Cómo pasar props?
- [ ] ¿Cómo enviar datos hijo → padre?
- [ ] ¿Cómo manejar eventos?
- [ ] ¿Cómo hacer renderizado condicional?
- [ ] ¿Cómo usar .map()?
- [ ] ¿Cómo usar react-hook-form?
- [ ] ¿Cómo usar CSS Modules?
- [ ] ¿Cómo implementar tema claro/oscuro?

---

**¡Éxito con React! 💪🚀**
# 📚 APUNTES COMPLETOS - PROYECTO FITLIFE REACT

## 🎯 ÍNDICE
1. [Conceptos Básicos de React](#1-conceptos-básicos-de-react)
2. [useState - Estado en React](#2-usestate---estado-en-react)
3. [Props - Comunicación entre Componentes](#3-props---comunicación-entre-componentes)
4. [Eventos en React](#4-eventos-en-react)
5. [Renderizado Condicional](#5-renderizado-condicional)
6. [Listas y .map()](#6-listas-y-map)
7. [Formularios con react-hook-form](#7-formularios-con-react-hook-form)
8. [CSS Modules](#8-css-modules)
9. [Sistema de Temas](#9-sistema-de-temas-modo-clarooscuro)
10. [Flujo Completo del Proyecto](#10-flujo-completo-del-proyecto)

---

## 1. CONCEPTOS BÁSICOS DE REACT

### ¿Qué es React?
React es una **librería de JavaScript** para crear interfaces de usuario. Divide la UI en **componentes** reutilizables.

### ¿Qué es un Componente?
Un componente es una **función que retorna JSX**.

```javascript
function MiComponente() {
  return <h1>Hola Mundo</h1>
}

export default MiComponente
```

### ¿Qué es JSX?
JSX = JavaScript + XML. Permite escribir HTML dentro de JavaScript.

```javascript
const nombre = "Juan"
return <h1>Hola {nombre}</h1>  // Variables con {}
```

**Diferencias con HTML:**
- `class` → `className`
- `for` → `htmlFor`
- Atributos en camelCase: `onclick` → `onClick`

---

## 2. USESTATE - ESTADO EN REACT

### ¿Qué es el Estado?
Información que puede **cambiar** en tu componente. Cuando cambia, React **re-renderiza** el componente.

### Sintaxis

```javascript
import { useState } from 'react'

function Contador() {
  // [valorActual, funciónParaCambiarlo]
  const [contador, setContador] = useState(0)
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>+</button>
    </div>
  )
}
```

### Ejemplos del Proyecto

**1. Estado número (paso actual):**
```javascript
// FormContainer.jsx
const [currentStep, setCurrentStep] = useState(1)

// Cambiar:
setCurrentStep(currentStep + 1)  // 1 → 2
```

**2. Estado string (tema):**
```javascript
// App.jsx
const [theme, setTheme] = useState('light')

// Cambiar:
if (theme === 'light') {
  setTheme('dark')
} else {
  setTheme('light')
}
```

**3. Estado objeto (datos formulario):**
```javascript
const [formData, setFormData] = useState({
  personalData: {},
  contactInfo: {}
})

// Actualizar UNA propiedad:
setFormData({
  ...formData,           // Copia todo lo anterior
  personalData: data     // Solo cambia esto
})
```

**⚠️ REGLAS:**
- ❌ `contador = 5` → NO funciona
- ✅ `setContador(5)` → SÍ funciona

---

## 3. PROPS - COMUNICACIÓN ENTRE COMPONENTES

### ¿Qué son?
**Props** (properties) = datos que un padre pasa a un hijo.

### Flujo
```
Padre → (props) → Hijo
```

### Ejemplo Básico

**Padre:**
```javascript
function Padre() {
  return <Hijo nombre="Juan" edad={25} />
}
```

**Hijo:**
```javascript
function Hijo({ nombre, edad }) {
  return <p>Hola, soy {nombre} y tengo {edad} años</p>
}
```

### Ejemplos del Proyecto

**1. Pasar números:**
```javascript
// FormContainer.jsx (padre)
<ProgressBar currentStep={1} totalSteps={4} />

// ProgressBar.jsx (hijo)
function ProgressBar({ currentStep, totalSteps }) {
  return <span>Paso {currentStep} de {totalSteps}</span>
}
```

**2. Pasar funciones (hijo → padre):**
```javascript
// FormContainer.jsx (padre)
const handleNextStep = () => {
  setCurrentStep(currentStep + 1)
}

<PersonalDataForm onNext={handleNextStep} />

// PersonalDataForm.jsx (hijo)
function PersonalDataForm({ onNext }) {
  const handleClick = () => {
    onNext()  // Llama a la función del padre
  }
}
```

**💡 PATRÓN IMPORTANTE:**
1. Padre crea función
2. Padre pasa función como prop
3. Hijo llama a esa función
4. Padre recibe datos/actualiza estado

---

## 4. EVENTOS EN REACT

### Eventos Comunes

| HTML | React |
|------|-------|
| `onclick` | `onClick` |
| `onsubmit` | `onSubmit` |
| `onchange` | `onChange` |

### Sintaxis

```javascript
// Función separada
function handleClick() {
  console.log("Click")
}
<button onClick={handleClick}>Click</button>

// Función inline
<button onClick={() => console.log("Click")}>Click</button>

// Con parámetros
<button onClick={() => deleteItem(id)}>Eliminar</button>
```

### Ejemplos del Proyecto

```javascript
// App.jsx - Toggle tema
const toggleTheme = () => {
  if (theme === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}

<button onClick={toggleTheme}>Cambiar Tema</button>
```

```javascript
// FormContainer.jsx - Navegación
<button onClick={handleBackStep}>← Atrás</button>
<button onClick={handleNextStep}>Siguiente →</button>
```

**⚠️ ERROR COMÚN:**
```javascript
// ❌ Ejecuta inmediatamente
<button onClick={handleClick()}>

// ✅ Correcto
<button onClick={handleClick}>
<button onClick={() => handleClick()}>
```

---

## 5. RENDERIZADO CONDICIONAL

### ¿Qué es?
Mostrar/ocultar elementos según una condición.

### Métodos

**1. if/else antes del return:**
```javascript
function Saludo({ esUsuario }) {
  if (esUsuario) {
    return <h1>Bienvenido Usuario</h1>
  }
  return <h1>Bienvenido Invitado</h1>
}
```

**2. Operador ternario (? :):**
```javascript
<h1>{esUsuario ? "Usuario" : "Invitado"}</h1>
```

**3. Operador && (solo si es true):**
```javascript
{mostrar && <p>Este texto solo se ve si mostrar es true</p>}
```

### Ejemplos del Proyecto

**1. Componente completo condicional:**
```javascript
// FormContainer.jsx
if (isSubmitted) {
  return <SuccessMessage userData={formData} />
}

return <div>{/* formularios */}</div>
```

**2. Mostrar formulario según paso:**
```javascript
{currentStep === 1 && <PersonalDataForm />}
{currentStep === 2 && <ContactInfoForm />}
{currentStep === 3 && <TrainingPreferencesForm />}
{currentStep === 4 && <PaymentForm />}
```

**3. Campos condicionales:**
```javascript
// PaymentForm.jsx
const requiresCard = selectedPaymentMethod === 'Tarjeta de crédito'

{requiresCard && (
  <>
    <input name="numeroTarjeta" />
    <input name="cvv" />
  </>
)}
```

**4. Texto condicional:**
```javascript
<button>
  {isLoading ? 'Procesando...' : 'Completar Registro'}
</button>
```

---

## 6. LISTAS Y .MAP()

### ¿Qué es .map()?
Método que **transforma cada elemento** de un array.

### Sintaxis Básica

```javascript
const numeros = [1, 2, 3]
const dobles = numeros.map(num => num * 2)
// dobles = [2, 4, 6]
```

### En React

```javascript
const frutas = ['Manzana', 'Banana']

return (
  <ul>
    {frutas.map((fruta, index) => (
      <li key={index}>{fruta}</li>
    ))}
  </ul>
)
```

**⚠️ IMPORTANTE:** Cada elemento necesita `key` única.

### Ejemplos del Proyecto

**1. Select con opciones:**
```javascript
// TrainingPreferencesForm.jsx
<select {...register("tipoEntrenamiento")}>
  <option value="">Selecciona</option>
  {trainingTypes.map(type => (
    <option key={type.id} value={type.name}>
      {type.name}
    </option>
  ))}
</select>

// trainingTypes = [
//   { id: 1, name: 'Cardio', description: '...' },
//   { id: 2, name: 'Fuerza', description: '...' }
// ]
```

**2. Radio buttons:**
```javascript
{fitnessGoals.map(goal => (
  <label key={goal.id}>
    <input type="radio" value={goal.name} />
    {goal.name}
  </label>
))}
```

**💡 PATRÓN:**
```javascript
array.map(elemento => (
  <div key={elemento.id}>
    {elemento.propiedad}
  </div>
))
```

---

## 7. FORMULARIOS CON REACT-HOOK-FORM

### ¿Qué es?
Librería que facilita **gestión de formularios** y **validaciones**.

### Instalación
```bash
npm install react-hook-form
```

### Configuración Básica

```javascript
import { useForm } from 'react-hook-form'

function MiFormulario() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    console.log(data)  // Datos del formulario
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nombre")} />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### Partes Importantes

**1. register** - Conecta input al formulario:
```javascript
<input {...register("nombre")} />
```

**2. handleSubmit** - Maneja envío:
```javascript
<form onSubmit={handleSubmit(onSubmit)}>
```

**3. errors** - Errores de validación:
```javascript
{errors.nombre && <span>{errors.nombre.message}</span>}
```

### Validaciones

**Campo obligatorio:**
```javascript
<input {...register("nombre", {
  required: "El nombre es obligatorio"
})} />
```

**Longitud mínima:**
```javascript
<input {...register("nombre", {
  required: "Obligatorio",
  minLength: {
    value: 2,
    message: "Mínimo 2 caracteres"
  }
})} />
```

**Validación personalizada:**
```javascript
<input {...register("email", {
  required: "Obligatorio",
  validate: (value) => validateEmail(value) || "Email inválido"
})} />
```

**Patrón (regex):**
```javascript
<input {...register("cvv", {
  pattern: {
    value: /^\d{3}$/,
    message: "CVV inválido (3 dígitos)"
  }
})} />
```

### Ejemplo Completo del Proyecto

```javascript
// PersonalDataForm.jsx
import { useForm } from 'react-hook-form'

function PersonalDataForm({ onNext, onFormData, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  const onSubmit = (data) => {
    onFormData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email obligatorio",
          validate: (value) => validateEmail(value) || "Email inválido"
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Siguiente</button>
    </form>
  )
}
```

### watch() - Observar valores

```javascript
const { watch } = useForm()
const selectedValue = watch('campo')

// selectedValue se actualiza cuando cambia el campo
{selectedValue && <p>Seleccionaste: {selectedValue}</p>}
```

---

## 8. CSS MODULES

### ¿Qué son?
CSS con **alcance local** a un componente. Sin conflictos de nombres.

### Sintaxis

**Archivo CSS: `Logo.module.css`**
```css
.logo {
  display: flex;
  gap: 1rem;
}

.logoText {
  font-size: 2rem;
}
```

**Archivo JSX: `Logo.jsx`**
```javascript
import styles from '../styles/Logo.module.css'

function Logo() {
  return (
    <div className={styles.logo}>
      <h2 className={styles.logoText}>FitLife</h2>
    </div>
  )
}
```

**HTML Resultante:**
```html
<div class="Logo_logo__a1b2c">
  <h2 class="Logo_logoText__d3e4f">FitLife</h2>
</div>
```

### Clases Dinámicas

```javascript
// Con template string
<div className={`${styles.logo} ${styles.large}`}>

// Condicional
<div className={isActive ? styles.active : styles.inactive}>
```

---

## 9. SISTEMA DE TEMAS (MODO CLARO/OSCURO)

### Arquitectura

1. Variables CSS (colores)
2. Atributo `data-theme` en HTML
3. Estado en React

### Paso 1: Variables CSS

```css
/* variables.css */
:root {
  --primary-color: #00E5FF;
  --bg-primary: #0B0D0F;
  --text-primary: #E6F7FF;
}

[data-theme="light"] {
  --bg-primary: #F8FBFD;
  --text-primary: #0B0D0F;
}
```

### Paso 2: Estado en React

```javascript
// App.jsx
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div data-theme={theme}>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </div>
  )
}
```

### Paso 3: Usar Variables

```css
.button {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### ¿Cómo Funciona?

```
Click → Estado cambia → data-theme cambia → CSS detecta cambio → Colores cambian
```

---

## 10. FLUJO COMPLETO DEL PROYECTO

### Arquitectura

```
App
└── FormContainer (cerebro)
      ├── ProgressBar
      ├── PersonalDataForm (paso 1)
      ├── ContactInfoForm (paso 2)
      ├── TrainingPreferencesForm (paso 3)
      ├── PaymentForm (paso 4)
      └── SuccessMessage
```

### Flujo de Datos

**1. Usuario completa Paso 1:**
```javascript
// PersonalDataForm.jsx
const onSubmit = (data) => {
  onFormData(data)  // Envía al padre
  onNext()          // Siguiente paso
}
```

**2. FormContainer guarda datos:**
```javascript
// FormContainer.jsx
const handleFormData = (step, data) => {

