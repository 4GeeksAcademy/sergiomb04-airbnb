# Clon de Airbnb - Contexto de producto

## Objetivo del proyecto
Construir una versión educativa de Airbnb con Next.js 16 (App Router), TypeScript y Tailwind CSS para practicar arquitectura de componentes, navegación interna y manejo de estado en una interfaz mobile-first.

## Usuario objetivo
El usuario es una persona que quiere encontrar alojamiento temporal para vacaciones o escapadas urbanas. Su objetivo es descubrir opciones, filtrar y comparar precios, y finalmente revisar el detalle de una habitación para decidir si reserva.

## Páginas a construir

### 1) Home (/)
- Navbar superior con logo, búsqueda y acciones de usuario.
- Fila horizontal de categorías (icono + etiqueta) con categoría activa.
- Cuadrícula responsive de tarjetas de alojamiento.
- Carga simulada al montar la página y filtrado en tiempo real por búsqueda/categoría.

### 2) Catálogo (/catalog)
- Cabecera con número de resultados.
- Control de ordenación por precio (ascendente/descendente).
- Reutilización de la tarjeta de alojamiento.
- Área de mapa como placeholder visual (derecha en escritorio, debajo en móvil).

### 3) Detalle de habitación (/rooms/[id])
- Carga simulada por id de la URL.
- Galería superior con navegación Anterior/Siguiente.
- Cabecera del alojamiento (título, rating, reseñas, ubicación).
- Bloque de anfitrión (avatar, nombre, años).
- Grid de amenities (icono + etiqueta).
- Tarjeta de reserva con precio por noche, contador de huéspedes y CTA.
- Botón para volver al catálogo.

## Componentes principales identificados
- Navbar: logo, búsqueda (opcional interactiva), links internos.
- RegionStrip: filtros de categoría con estado activo.
- ListingCard: tarjeta reutilizable para Home y Catálogo.
- Footer: secciones de soporte/comunidad/alojar + redes.

## Especificaciones derivadas de capturas (flujo visión -> componentes)

### Home - Especificación
- `Navbar`
    - Props: `searchValue`, `onSearchChange`, `minimal?`
    - Relación: componente superior, fijo/sticky.
- `RegionStrip`
    - Props: `categories`, `activeCategory`, `onSelect`
    - Relación: debajo de navbar, scroll horizontal en móvil.
- `ListingCard`
    - Props: `listing`, `href?`
    - Relación: grid de 1 columna en móvil, múltiples en escritorio.

### Catálogo - Especificación
- `ResultsHeader` (integrado en la página)
    - Estado: `sortOrder` (`asc` | `desc`)
    - Relación: encima del listado.
- `ListingCard`
    - Reutilizado desde Home.
- `MapPlaceholder` (integrado en la página)
    - Relación: lateral derecho en desktop y bloque inferior en móvil.

### Detalle - Especificación
- `RoomGallery` (integrado en la página)
    - Estado: `imageIndex`
    - Props de datos: `images[]`
- `RoomHeader` (integrado)
    - Props de datos: `title`, `rating`, `reviews`, `location`
- `HostInfo` (integrado)
    - Props de datos: `host.name`, `host.years`, `host.avatar`
- `AmenitiesGrid` (integrado)
    - Props de datos: `amenities[]`
- `BookingCard` (integrado)
    - Estado: `guests` con rango mínimo/máximo
    - Props de datos: `pricePerNight`