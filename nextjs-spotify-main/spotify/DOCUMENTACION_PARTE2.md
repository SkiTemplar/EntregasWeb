# Spotify Taste Mixer - Documentación Teórica (Parte 2)

## Índice

1. [Fundamentos de Next.js](#1-fundamentos-de-nextjs)
2. [App Router y Sistema de Rutas](#2-app-router-y-sistema-de-rutas)
3. [API Routes en Next.js](#3-api-routes-en-nextjs)
4. [Tailwind CSS - Guía Completa](#4-tailwind-css---guía-completa)
5. [Peticiones HTTP y Fetch API](#5-peticiones-http-y-fetch-api)
6. [Autenticación OAuth 2.0](#6-autenticación-oauth-20)
7. [JavaScript Moderno (ES6+)](#7-javascript-moderno-es6)
8. [Hooks Avanzados de React](#8-hooks-avanzados-de-react)
9. [Patrones de Diseño en React](#9-patrones-de-diseño-en-react)
10. [Manejo de Errores](#10-manejo-de-errores)
11. [Variables de Entorno](#11-variables-de-entorno)
12. [Preguntas Frecuentes de Examen](#12-preguntas-frecuentes-de-examen)

---

## 1. Fundamentos de Next.js

### ¿Qué es Next.js?

Next.js es un **framework de React** que proporciona:

- **Renderizado del lado del servidor (SSR)**: El HTML se genera en el servidor
- **Generación estática (SSG)**: Páginas pre-renderizadas en tiempo de build
- **Enrutamiento basado en archivos**: La estructura de carpetas define las rutas
- **API Routes**: Backend integrado en el mismo proyecto
- **Optimización automática**: Imágenes, fuentes, scripts

### Diferencia entre React y Next.js

| Característica | React (Solo) | Next.js |
|----------------|--------------|---------|
| Tipo | Biblioteca | Framework |
| Renderizado | Solo cliente (CSR) | SSR, SSG, CSR |
| Enrutamiento | Necesita react-router | Integrado |
| SEO | Limitado | Excelente |
| API Backend | No incluido | API Routes |
| Configuración | Manual (webpack, etc.) | Automática |

### Client Components vs Server Components

```javascript
// SERVER COMPONENT (por defecto en Next.js 13+)
// - Se ejecuta en el servidor
// - NO puede usar hooks (useState, useEffect)
// - NO puede usar eventos del navegador (onClick)
// - Puede hacer fetch directamente
// - Mejor rendimiento y SEO

export default function ServerComponent() {
  // Esto se ejecuta en el servidor
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

```javascript
// CLIENT COMPONENT
// - Se ejecuta en el navegador
// - PUEDE usar hooks y eventos
// - Necesita la directiva 'use client'

'use client';  // ← Esta directiva es OBLIGATORIA

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### ¿Cuándo usar cada uno?

| Usar Server Component | Usar Client Component |
|----------------------|----------------------|
| Fetch de datos | useState, useEffect |
| Acceso a backend | onClick, onChange |
| Datos sensibles | Interactividad |
| SEO importante | Animaciones |

---

## 2. App Router y Sistema de Rutas

### Estructura de Carpetas = Rutas

```
src/app/
├── page.js              → URL: /
├── layout.js            → Layout para todas las páginas
├── globals.css          → Estilos globales
├── dashboard/
│   └── page.js          → URL: /dashboard
├── auth/
│   └── callback/
│       └── page.js      → URL: /auth/callback
└── api/
    └── spotify-token/
        └── route.js     → API: /api/spotify-token
```

### Archivos Especiales

| Archivo | Propósito |
|---------|-----------|
| `page.js` | Define el contenido de una ruta |
| `layout.js` | Envuelve las páginas con estructura común |
| `loading.js` | UI de carga mientras se carga la página |
| `error.js` | UI de error si algo falla |
| `not-found.js` | Página 404 personalizada |
| `route.js` | Define un endpoint de API |

### Layout - Estructura Compartida

```javascript
// app/layout.js - Layout RAÍZ (envuelve TODA la app)
import './globals.css';

export const metadata = {
  title: 'Spotify Taste Mixer',
  description: 'Genera playlists personalizadas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#121212]">
        {children}  {/* ← Aquí se renderiza cada página */}
      </body>
    </html>
  );
}
```

**Concepto clave:** `children` es una prop especial que contiene el contenido de la página actual.

### Navegación entre Páginas

```javascript
'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MiComponente() {
  const router = useRouter();

  // Método 1: Componente Link (preferido para navegación simple)
  return <Link href="/dashboard">Ir al Dashboard</Link>;

  // Método 2: Navegación programática
  const irAlDashboard = () => {
    router.push('/dashboard');    // Agrega al historial
    // o
    router.replace('/dashboard'); // Reemplaza (no guarda en historial)
  };
}
```

### Diferencia entre push y replace

```javascript
// push: Usuario puede volver atrás con el botón del navegador
router.push('/nueva-pagina');

// replace: No se puede volver atrás (útil después de login)
router.replace('/dashboard');
```

---

## 3. API Routes en Next.js

### ¿Qué son las API Routes?

Permiten crear endpoints de backend **dentro del mismo proyecto** de Next.js.

```
src/app/api/
├── spotify-token/
│   └── route.js     → POST /api/spotify-token
└── refresh-token/
    └── route.js     → POST /api/refresh-token
```

### Estructura de una API Route

```javascript
// app/api/spotify-token/route.js
import { NextResponse } from 'next/server';

// Manejar peticiones GET
export async function GET(request) {
  return NextResponse.json({ message: 'Hola' });
}

// Manejar peticiones POST
export async function POST(request) {
  try {
    // 1. Obtener datos del body
    const body = await request.json();
    const { code } = body;

    // 2. Validar
    if (!code) {
      return NextResponse.json(
        { error: 'Código requerido' },
        { status: 400 }  // Bad Request
      );
    }

    // 3. Hacer algo con los datos
    const resultado = await procesarCodigo(code);

    // 4. Retornar respuesta exitosa
    return NextResponse.json({
      success: true,
      data: resultado
    });

  } catch (error) {
    // 5. Manejar errores
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

### Métodos HTTP disponibles

```javascript
export async function GET(request) { }     // Obtener datos
export async function POST(request) { }    // Crear datos
export async function PUT(request) { }     // Actualizar datos
export async function DELETE(request) { }  // Eliminar datos
export async function PATCH(request) { }   // Actualizar parcialmente
```

### ¿Por qué usar API Routes?

1. **Ocultar secretos**: Las variables de entorno privadas solo están disponibles en el servidor
2. **Seguridad**: No exponer lógica sensible al cliente
3. **Proxy**: Intermediario entre tu app y APIs externas

```javascript
// ❌ MAL: Exponer secreto en el cliente
const response = await fetch('https://api.spotify.com/token', {
  headers: { 'Authorization': 'Basic ' + MI_SECRETO }  // ¡Visible en el navegador!
});

// ✅ BIEN: Usar API Route como intermediario
// El cliente llama a TU API
const response = await fetch('/api/spotify-token', {
  method: 'POST',
  body: JSON.stringify({ code })
});
// Tu API Route usa el secreto (invisible para el cliente)
```

---

## 4. Tailwind CSS - Guía Completa

### ¿Qué es Tailwind CSS?

Es un framework de CSS **utility-first** donde usas clases predefinidas directamente en el HTML/JSX.

```javascript
// CSS tradicional
<div className="mi-boton">Guardar</div>
// .mi-boton { background: green; padding: 10px; border-radius: 5px; }

// Tailwind CSS
<div className="bg-green-500 p-2 rounded">Guardar</div>
```

### Configuración en Next.js

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},  // Procesa las clases de Tailwind
  },
};
export default config;
```

```css
/* globals.css */
@import "tailwindcss";  /* Importa Tailwind */
```

### Sistema de Espaciado

Tailwind usa una escala numérica donde **1 unidad = 0.25rem = 4px**:

| Clase | Valor | Píxeles |
|-------|-------|---------|
| `p-0` | 0 | 0px |
| `p-1` | 0.25rem | 4px |
| `p-2` | 0.5rem | 8px |
| `p-4` | 1rem | 16px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |

### Direcciones de Padding y Margin

```javascript
// Padding
<div className="p-4">    // padding: 1rem (todos los lados)
<div className="px-4">   // padding-left + padding-right
<div className="py-4">   // padding-top + padding-bottom
<div className="pt-4">   // padding-top
<div className="pr-4">   // padding-right
<div className="pb-4">   // padding-bottom
<div className="pl-4">   // padding-left

// Margin (misma lógica)
<div className="m-4">    // margin: 1rem
<div className="mx-auto"> // margin-left: auto; margin-right: auto (centrar)
<div className="mt-4">   // margin-top
```

### Colores

```javascript
// Escala de colores (50 más claro → 950 más oscuro)
<div className="bg-zinc-900">     // Fondo gris muy oscuro
<div className="text-white">      // Texto blanco
<div className="text-zinc-400">   // Texto gris
<div className="border-zinc-700"> // Borde gris

// Colores personalizados con valores arbitrarios
<div className="bg-[#1DB954]">    // Verde Spotify exacto
<div className="text-[#121212]">  // Color exacto
```

### Flexbox

```javascript
// Contenedor flex
<div className="flex">                    // display: flex
<div className="flex flex-col">           // flex-direction: column
<div className="flex flex-row">           // flex-direction: row (default)

// Alineación
<div className="flex items-center">       // align-items: center
<div className="flex justify-center">     // justify-content: center
<div className="flex justify-between">    // justify-content: space-between
<div className="flex items-center justify-center">  // Centrado total

// Gap (espacio entre elementos)
<div className="flex gap-2">              // gap: 0.5rem
<div className="flex gap-4">              // gap: 1rem
```

### Grid

```javascript
// Grid básico
<div className="grid grid-cols-2">        // 2 columnas
<div className="grid grid-cols-3 gap-4">  // 3 columnas con gap

// Columnas responsivas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// 1 columna en móvil, 2 en tablet, 3 en desktop
```

### Responsive Design (Breakpoints)

```javascript
// Mobile first: las clases sin prefijo aplican a TODOS los tamaños
// Los prefijos aplican desde ese tamaño hacia arriba

<div className="text-sm md:text-base lg:text-xl">
//              ↑ móvil   ↑ tablet    ↑ desktop
```

| Prefijo | Tamaño mínimo | Dispositivo |
|---------|---------------|-------------|
| (ninguno) | 0px | Móvil |
| `sm:` | 640px | Móvil grande |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |
| `2xl:` | 1536px | Pantallas muy grandes |

### Estados (Hover, Focus, etc.)

```javascript
// Hover
<button className="bg-green-500 hover:bg-green-600">
// Focus
<input className="border-gray-300 focus:border-blue-500 focus:outline-none">
// Active
<button className="bg-green-500 active:bg-green-700">
// Disabled
<button className="bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
```

### Transiciones y Animaciones

```javascript
// Transición suave
<button className="transition-colors duration-200">
// transition-all, transition-opacity, transition-transform

// Ejemplo completo de botón
<button className="
  bg-[#1DB954] 
  hover:bg-[#1ed760] 
  transition-colors 
  duration-200 
  rounded-full 
  px-6 
  py-3
">
  Generar
</button>
```

### Ejemplo Real del Proyecto

```javascript
// Header.jsx
<header className="bg-[#181818] border-b border-[#282828] px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-3">
      <FaSpotify className="text-[#1DB954] text-3xl" />
      <span className="text-white font-bold text-xl">Taste Mixer</span>
    </div>
    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
      <FiLogOut className="text-xl" />
      <span className="hidden sm:inline">Cerrar sesion</span>
    </button>
  </div>
</header>
```

**Desglose:**
- `bg-[#181818]`: Fondo con color personalizado
- `border-b border-[#282828]`: Borde solo abajo
- `px-6 py-4`: Padding horizontal 24px, vertical 16px
- `max-w-7xl mx-auto`: Ancho máximo + centrado
- `flex items-center justify-between`: Flexbox con elementos centrados y espaciados
- `gap-3`: Espacio de 12px entre elementos
- `text-zinc-400 hover:text-white`: Gris que cambia a blanco en hover
- `transition-colors`: Animación suave del cambio de color
- `hidden sm:inline`: Oculto en móvil, visible desde 640px

---

## 5. Peticiones HTTP y Fetch API

### Anatomía de una Petición HTTP

```
┌─────────────────────────────────────────────┐
│  PETICIÓN (Request)                         │
├─────────────────────────────────────────────┤
│  Método: GET, POST, PUT, DELETE             │
│  URL: https://api.spotify.com/v1/me         │
│  Headers: Authorization, Content-Type       │
│  Body: { datos } (solo POST/PUT)            │
└─────────────────────────────────────────────┘
                    ↓
                 SERVIDOR
                    ↓
┌─────────────────────────────────────────────┐
│  RESPUESTA (Response)                       │
├─────────────────────────────────────────────┤
│  Status Code: 200, 401, 404, 500            │
│  Headers: Content-Type, etc.                │
│  Body: { datos de respuesta }               │
└─────────────────────────────────────────────┘
```

### Métodos HTTP

| Método | Propósito | ¿Tiene Body? |
|--------|-----------|--------------|
| GET | Obtener datos | No |
| POST | Crear datos | Sí |
| PUT | Actualizar (reemplazar) | Sí |
| PATCH | Actualizar (parcial) | Sí |
| DELETE | Eliminar | Generalmente no |

### Códigos de Estado (Status Codes)

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Éxito |
| 201 | Created | Se creó un recurso (POST exitoso) |
| 204 | No Content | Éxito sin contenido de respuesta |
| 400 | Bad Request | Error en los datos enviados |
| 401 | Unauthorized | No autenticado / Token inválido |
| 403 | Forbidden | No tienes permiso |
| 404 | Not Found | Recurso no existe |
| 429 | Too Many Requests | Rate limiting |
| 500 | Internal Server Error | Error del servidor |

### Fetch API - Sintaxis Completa

```javascript
// GET - Obtener datos
const response = await fetch('https://api.spotify.com/v1/me', {
  method: 'GET',  // Opcional, GET es el default
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// POST - Enviar datos
const response = await fetch('https://api.spotify.com/v1/playlists', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'  // Obligatorio para enviar JSON
  },
  body: JSON.stringify({
    name: 'Mi Playlist',
    description: 'Creada con mi app'
  })
});

// Procesar respuesta
if (!response.ok) {
  throw new Error(`Error: ${response.status}`);
}
const data = await response.json();  // Parsear JSON
```

### Headers Comunes

```javascript
headers: {
  // Autenticación
  'Authorization': 'Bearer TOKEN_AQUI',
  
  // Tipo de contenido que ENVÍAS
  'Content-Type': 'application/json',
  
  // Tipo de contenido que ACEPTAS recibir
  'Accept': 'application/json',
}
```

### Async/Await vs Promises

```javascript
// Con Async/Await (más legible) ✅
async function obtenerUsuario() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Con Promises (equivalente)
function obtenerUsuario() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}
```

### Patrón Completo de Petición

```javascript
const fetchData = async () => {
  setLoading(true);       // 1. Indicar que está cargando
  setError(null);         // 2. Limpiar errores anteriores

  try {
    const token = getAccessToken();
    
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // 3. Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    setData(data);        // 4. Guardar datos en el estado

  } catch (error) {
    setError(error.message);  // 5. Guardar error
    console.error('Error:', error);
  } finally {
    setLoading(false);    // 6. Siempre quitar loading
  }
};
```

### Query Parameters

```javascript
// Método 1: Concatenación simple
const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`;

// Método 2: URLSearchParams (más seguro)
const params = new URLSearchParams({
  q: query,
  type: 'artist',
  limit: '5'
});
const url = `https://api.spotify.com/v1/search?${params.toString()}`;

// encodeURIComponent para caracteres especiales
const busqueda = 'rock & roll';
const url = `?q=${encodeURIComponent(busqueda)}`;
// Resultado: ?q=rock%20%26%20roll
```

---

## 6. Autenticación OAuth 2.0

### ¿Qué es OAuth 2.0?

Es un protocolo de autorización que permite a tu aplicación acceder a datos de un usuario en otro servicio (como Spotify) **sin conocer su contraseña**.

### Flujo de Autorización (Authorization Code)

```
┌──────────────┐      1. Redirigir a Spotify       ┌──────────────┐
│              │ ─────────────────────────────────→ │              │
│   Tu App     │                                    │   Spotify    │
│              │ ←───────────────────────────────── │              │
└──────────────┘   2. Usuario inicia sesión         └──────────────┘
       │               y autoriza
       │
       │           3. Spotify redirige con CODE
       ↓
┌──────────────┐
│  /callback   │  4. Tu app envía CODE al servidor
└──────────────┘
       │
       ↓
┌──────────────┐      5. Intercambiar CODE          ┌──────────────┐
│   Tu API     │ ─────────────────────────────────→ │   Spotify    │
│   Route      │                                    │   /token     │
│              │ ←───────────────────────────────── │              │
└──────────────┘      6. Recibe ACCESS_TOKEN        └──────────────┘
       │
       │           7. Guardar tokens en localStorage
       ↓
┌──────────────┐
│  Dashboard   │  8. Usar token para hacer peticiones
└──────────────┘
```

### Paso 1: Construir URL de Autorización

```javascript
// lib/auth.js
export function getSpotifyAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const state = generateRandomString(16);  // Prevenir CSRF

  // Permisos que solicitas
  const scope = [
    'user-read-private',       // Leer perfil
    'user-read-email',         // Leer email
    'playlist-modify-public',  // Crear/modificar playlists
    'playlist-modify-private', // Crear/modificar playlists privadas
  ].join(' ');

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    state: state,
    scope: scope
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
```

### Paso 2: Callback recibe el CODE

```javascript
// app/auth/callback/page.js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');    // Código de Spotify
    const error = searchParams.get('error');  // Posible error

    if (error) {
      router.replace('/?error=access_denied');
      return;
    }

    if (code) {
      exchangeToken(code);  // Intercambiar por tokens
    }
  }, []);

  const exchangeToken = async (code) => {
    // Llamar a NUESTRA API Route
    const response = await fetch('/api/spotify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    
    // Guardar tokens
    saveTokens(data.access_token, data.refresh_token, data.expires_in);
    
    // Ir al dashboard
    router.replace('/dashboard');
  };
}
```

### Paso 3: API Route intercambia el CODE

```javascript
// app/api/spotify-token/route.js
export async function POST(request) {
  const { code } = await request.json();

  // Credenciales SECRETAS (solo en servidor)
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
}
```

### Tokens

| Token | Propósito | Duración |
|-------|-----------|----------|
| Access Token | Hacer peticiones a la API | 1 hora |
| Refresh Token | Obtener nuevo access token | Largo plazo |

### Verificar si está autenticado

```javascript
export function isAuthenticated() {
  const token = localStorage.getItem('spotify_token');
  const expiration = localStorage.getItem('spotify_token_expiration');
  
  if (!token || !expiration) return false;
  
  // Verificar que no haya expirado
  return Date.now() < parseInt(expiration);
}
```

---

## 7. JavaScript Moderno (ES6+)

### Destructuring (Desestructuración)

```javascript
// De objetos
const usuario = { nombre: 'Juan', edad: 25, email: 'juan@mail.com' };
const { nombre, edad } = usuario;  // nombre = 'Juan', edad = 25

// En parámetros de función (muy usado en React)
function TrackCard({ track, isFavorite, onRemove }) {
  // Equivale a: const track = props.track;
}

// De arrays
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;  // primero = 'rojo', segundo = 'verde'

// En useState
const [count, setCount] = useState(0);  // Desestructura el array que retorna useState
```

### Spread Operator (...)

```javascript
// Copiar y agregar a arrays
const original = [1, 2, 3];
const copia = [...original];           // [1, 2, 3]
const extendido = [...original, 4, 5]; // [1, 2, 3, 4, 5]

// Agregar elemento al principio
const conNuevo = [nuevoItem, ...original];

// Copiar y modificar objetos
const persona = { nombre: 'Ana', edad: 30 };
const actualizado = { ...persona, edad: 31 };  // { nombre: 'Ana', edad: 31 }

// En llamadas a funciones
const numeros = [1, 2, 3];
Math.max(...numeros);  // Equivale a Math.max(1, 2, 3)
```

### Template Literals

```javascript
const nombre = 'Juan';
const edad = 25;

// Concatenación antigua
const mensaje = 'Hola ' + nombre + ', tienes ' + edad + ' años';

// Template literals (backticks `)
const mensaje = `Hola ${nombre}, tienes ${edad} años`;

// Multilínea
const html = `
  <div>
    <h1>${titulo}</h1>
    <p>${descripcion}</p>
  </div>
`;
```

### Arrow Functions

```javascript
// Función tradicional
function sumar(a, b) {
  return a + b;
}

// Arrow function
const sumar = (a, b) => {
  return a + b;
};

// Arrow function con return implícito (una línea)
const sumar = (a, b) => a + b;

// Un solo parámetro (paréntesis opcionales)
const doble = x => x * 2;

// En callbacks
const mayores = numeros.filter(n => n > 10);
const dobles = numeros.map(n => n * 2);
```

### Optional Chaining (?.)

```javascript
// Sin optional chaining
const imagen = track && track.album && track.album.images && track.album.images[0];

// Con optional chaining
const imagen = track?.album?.images?.[0];

// Si alguna propiedad es null/undefined, retorna undefined en vez de error
```

### Nullish Coalescing (??)

```javascript
// || considera falsy: 0, '', false, null, undefined
const valor = dato || 'default';  // Si dato es 0 o '', usa 'default' 😕

// ?? solo considera null y undefined
const valor = dato ?? 'default';  // Solo usa 'default' si dato es null/undefined ✅
```

### Array Methods Importantes

```javascript
// map: Transforma cada elemento
const nombres = usuarios.map(u => u.nombre);  // ['Ana', 'Juan', ...]

// filter: Filtra elementos que cumplan condición
const adultos = usuarios.filter(u => u.edad >= 18);

// find: Encuentra el primer elemento que cumpla
const juan = usuarios.find(u => u.nombre === 'Juan');

// some: ¿Alguno cumple?
const hayMenores = usuarios.some(u => u.edad < 18);  // true/false

// every: ¿Todos cumplen?
const todosAdultos = usuarios.every(u => u.edad >= 18);  // true/false

// reduce: Reducir a un valor
const suma = numeros.reduce((acc, n) => acc + n, 0);

// includes: ¿Contiene el valor?
const tieneJuan = nombres.includes('Juan');  // true/false

// Encadenar métodos
const resultado = usuarios
  .filter(u => u.edad >= 18)
  .map(u => u.nombre)
  .sort();
```

### Eliminar Duplicados

```javascript
// Con Set
const unicos = [...new Set(array)];

// Con Map (para objetos por ID)
const uniqueTracks = [...new Map(tracks.map(t => [t.id, t])).values()];
```

---

## 8. Hooks Avanzados de React

### useEffect - Casos de Uso

```javascript
// 1. Ejecutar al montar (array vacío)
useEffect(() => {
  console.log('Componente montado');
  cargarDatos();
}, []);

// 2. Ejecutar cuando cambie una dependencia
useEffect(() => {
  console.log('Query cambió:', query);
  buscar(query);
}, [query]);

// 3. Cleanup (limpiar al desmontar)
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  // Esta función se ejecuta al desmontar
  return () => {
    clearInterval(timer);
  };
}, []);
```

### useCallback - Memorizar Funciones

```javascript
// Sin useCallback: la función se recrea en cada render
const handleClick = () => {
  console.log(count);
};

// Con useCallback: la función se memoriza
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);  // Solo se recrea si 'count' cambia

// Útil cuando pasas funciones a componentes hijos
<ChildComponent onClick={handleClick} />
```

### useMemo - Memorizar Valores

```javascript
// Sin useMemo: se recalcula en cada render
const filtrados = lista.filter(item => item.activo);

// Con useMemo: solo recalcula cuando 'lista' cambia
const filtrados = useMemo(() => {
  return lista.filter(item => item.activo);
}, [lista]);
```

### useRef - Referencias

```javascript
// 1. Referencia a elemento DOM
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

return <input ref={inputRef} />;

// 2. Guardar valor que persiste entre renders (sin causar re-render)
const contadorRef = useRef(0);
contadorRef.current += 1;  // No causa re-render
```

### Custom Hooks

```javascript
// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Uso
const [favorites, setFavorites] = useLocalStorage('favorites', []);
```

---

## 9. Patrones de Diseño en React

### Lifting State Up (Elevar Estado)

Cuando varios componentes necesitan compartir estado, se eleva al ancestro común.

```javascript
// ❌ MAL: Estado duplicado
function ArtistWidget() {
  const [artists, setArtists] = useState([]);  // Su propio estado
}

function GenreWidget() {
  const [genres, setGenres] = useState([]);    // Su propio estado
}

// ✅ BIEN: Estado en el padre
function Dashboard() {
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  return (
    <>
      <ArtistWidget 
        selectedArtists={artists} 
        onSelect={setArtists} 
      />
      <GenreWidget 
        selectedGenres={genres} 
        onSelect={setGenres} 
      />
      <GenerateButton artists={artists} genres={genres} />
    </>
  );
}
```

### Render Props vs Children

```javascript
// Children pattern
function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  return <div className="modal">{children}</div>;
}

<Modal isOpen={true}>
  <h1>Título</h1>
  <p>Contenido</p>
</Modal>
```

### Composición vs Herencia

React favorece la **composición** sobre la herencia:

```javascript
// Composición: combinar componentes
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function TrackCard({ track }) {
  return (
    <Card title={track.name}>
      <img src={track.album.images[0].url} />
      <p>{track.artists[0].name}</p>
    </Card>
  );
}
```

---

## 10. Manejo de Errores

### Try-Catch en Async

```javascript
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    setData(data);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Petición cancelada');
    } else {
      setError(error.message);
      console.error('Error:', error);
    }
  }
};
```

### Error Boundaries (Class Components)

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}

// Uso
<ErrorBoundary>
  <MiComponente />
</ErrorBoundary>
```

---

## 11. Variables de Entorno

### Tipos en Next.js

```bash
# .env.local

# PÚBLICAS (accesibles en cliente Y servidor)
# Prefijo: NEXT_PUBLIC_
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=abc123
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback

# PRIVADAS (solo servidor - API Routes)
# Sin prefijo
SPOTIFY_CLIENT_SECRET=secreto123
DATABASE_URL=postgres://...
```

### Acceder a Variables

```javascript
// En cliente (componentes)
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

// En servidor (API Routes)
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;  // Solo disponible aquí
```

### ¿Por qué separar?

| Tipo | Visible en | Uso |
|------|------------|-----|
| `NEXT_PUBLIC_*` | Navegador (código fuente) | IDs públicos, URLs |
| Sin prefijo | Solo servidor | Secretos, API keys |

---

## 12. Preguntas Frecuentes de Examen

### React

**P: ¿Qué es el Virtual DOM?**
R: Es una representación en memoria del DOM real. React compara el Virtual DOM anterior con el nuevo (diffing) y solo actualiza los elementos que cambiaron en el DOM real.

**P: ¿Cuál es la diferencia entre props y state?**
R: 
- Props: Datos que pasa el padre, inmutables para el hijo
- State: Datos internos del componente, mutables con setState

**P: ¿Por qué usar keys en listas?**
R: React usa las keys para identificar qué elementos cambiaron, se agregaron o eliminaron. Sin keys únicas, React no puede optimizar el renderizado.

**P: ¿Qué hace 'use client'?**
R: Indica que el componente se ejecutará en el navegador (Client Component), permitiendo usar hooks, eventos y APIs del navegador.

### Next.js

**P: ¿Diferencia entre SSR y CSR?**
R:
- SSR (Server-Side Rendering): HTML generado en el servidor
- CSR (Client-Side Rendering): HTML generado en el navegador con JavaScript

**P: ¿Para qué sirven las API Routes?**
R: Para crear endpoints backend dentro del proyecto Next.js, útil para ocultar secretos y como proxy a APIs externas.

**P: ¿Cómo funciona el enrutamiento en Next.js?**
R: Es basado en archivos. La estructura de carpetas en `app/` define las rutas automáticamente.

### HTTP

**P: ¿Diferencia entre GET y POST?**
R:
- GET: Obtener datos, sin body, datos en URL
- POST: Enviar datos, con body, datos ocultos

**P: ¿Qué significa un error 401?**
R: No autenticado. El token es inválido, expiró o no se envió.

**P: ¿Qué es un Bearer Token?**
R: Esquema de autenticación donde el token se envía en el header Authorization: `Bearer {token}`

### OAuth

**P: ¿Por qué usar OAuth en lugar de username/password?**
R: 
- No manejas contraseñas de usuarios
- Permisos granulares (scopes)
- El usuario puede revocar acceso

### Tailwind

**P: ¿Qué significa "utility-first"?**
R: En lugar de crear clases semánticas (`.btn-primary`), usas clases de utilidad pequeñas (`bg-blue-500 px-4 py-2 rounded`).

**P: ¿Cómo funciona el responsive design en Tailwind?**
R: Mobile-first con prefijos (`sm:`, `md:`, `lg:`). Las clases sin prefijo aplican a todos los tamaños.

---

## Resumen: Checklist para el Examen

### React
- [ ] useState y setState
- [ ] useEffect y dependencias
- [ ] Props y comunicación padre-hijo
- [ ] Eventos (onClick, onChange)
- [ ] Renderizado condicional
- [ ] Listas y keys
- [ ] 'use client'

### Next.js
- [ ] App Router y estructura de carpetas
- [ ] page.js, layout.js, route.js
- [ ] Client vs Server Components
- [ ] API Routes
- [ ] Variables de entorno
- [ ] useRouter y Link

### Tailwind
- [ ] Sistema de espaciado (p-4, m-2, gap-3)
- [ ] Flexbox (flex, items-center, justify-between)
- [ ] Responsive (sm:, md:, lg:)
- [ ] Colores y estados (hover:, focus:)
- [ ] Valores arbitrarios ([#1DB954])

### HTTP/Fetch
- [ ] Métodos (GET, POST, PUT, DELETE)
- [ ] Headers (Authorization, Content-Type)
- [ ] Status codes (200, 401, 404, 500)
- [ ] async/await y try/catch
- [ ] JSON.stringify y response.json()

### JavaScript ES6+
- [ ] Destructuring
- [ ] Spread operator
- [ ] Arrow functions
- [ ] Template literals
- [ ] Optional chaining (?.)
- [ ] Array methods (map, filter, find)

