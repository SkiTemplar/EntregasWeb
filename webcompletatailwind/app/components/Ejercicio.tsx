export default function Ejercicio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. HEADER / NAVEGACIÓN (10 puntos)
          TODO:
          - Crear header con logo y navegación
          - En móvil: logo + hamburguesa (links ocultos)
          - En tablet/desktop: logo + links visibles
          - Usar: hidden, md:block, md:flex, justify-between
          - Fondo oscuro (bg-gray-900), texto blanco
      */}
      <header>
        {/* Tu código aquí */}
      </header>

      {/* 2. SECCIÓN HERO (15 puntos)
          TODO:
          - Grid 2 columnas en desktop, 1 en móvil
          - Columna izquierda: título, subtítulo, 2 botones
          - Columna derecha: imagen/placeholder
          - En móvil: imagen arriba, texto abajo (usar order)
          - Usar: grid, grid-cols-1, md:grid-cols-2
      */}
      <section>
        {/* Tu código aquí */}
      </section>

      {/* 3. SECCIÓN DE CARACTERÍSTICAS (15 puntos)
          TODO:
          - Grid responsive: 1 col móvil, 2 cols tablet, 4 cols desktop
          - Mínimo 4 tarjetas con: icono, título, descripción
          - Hover effect (escala o sombra)
          - Usar: sm:grid-cols-2, lg:grid-cols-4, hover:scale-105
      */}
      <section>
        <div>
          {/* Tarjeta 1 */}
          {/* Tarjeta 2 */}
          {/* Tarjeta 3 */}
          {/* Tarjeta 4 */}
        </div>
      </section>

      {/* 4. GALERÍA DE PRODUCTOS (20 puntos)
          TODO:
          - Grid responsive: 1/2/3/4 columnas según breakpoint
          - Mínimo 6 productos
          - Cada producto: imagen, nombre, precio, botón
          - EXTRA: Primer producto ocupa 2 columnas en desktop (col-span-2)
          - Usar: first:col-span-2, xl:grid-cols-4
      */}
      <section>
        <div>
          {/* Producto 1 (destacado) */}
          {/* Producto 2 */}
          {/* Producto 3 */}
          {/* Producto 4 */}
          {/* Producto 5 */}
          {/* Producto 6 */}
        </div>
      </section>

      {/* 5. SECCIÓN DASHBOARD / ESTADÍSTICAS (20 puntos)
          TODO:
          - Grid: 1 col móvil, 2 cols tablet, 4 cols desktop
          - Una métrica destacada ocupa 2 columnas
          - Cada métrica: título, número grande, indicador cambio
          - Usar gradientes: bg-gradient-to-br
          - Usar: md:col-span-2
      */}
      <section>
        <div>
          {/* Métrica 1 (destacada, 2 cols) */}
          {/* Métrica 2 */}
          {/* Métrica 3 */}
          {/* Métrica 4 */}
        </div>
      </section>

      {/* 6. SECCIÓN DE TESTIMONIOS (10 puntos)
          TODO:
          - Grid: 1 col móvil, 3 cols desktop
          - Mínimo 3 testimonios
          - Cada uno: avatar circular, nombre, comentario, estrellas
          - Usar: rounded-full, shadow-lg, md:grid-cols-3
      */}
      <section>
        <div>
          {/* Testimonio 1 */}
          {/* Testimonio 2 */}
          {/* Testimonio 3 */}
        </div>
      </section>

      {/* 7. FOOTER (10 puntos)
          TODO:
          - Grid: 1 col móvil, 3 cols tablet
          - 3 secciones: info empresa, enlaces, newsletter
          - Copyright centrado (col-span-full)
          - Fondo oscuro (bg-gray-900)
          - Usar: md:grid-cols-3, col-span-full
      */}
      <footer>
        <div>
          {/* Sección 1: Info empresa */}
          {/* Sección 2: Enlaces rápidos */}
          {/* Sección 3: Newsletter */}
          {/* Copyright (full width) */}
        </div>
      </footer>
    </div>
  )
}

