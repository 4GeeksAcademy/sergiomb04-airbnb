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

## Arquitectura del Backend Dinámico

### Concepto
El backend (`backend/fake_backend.py`) utiliza archivos JSON organizados similar al **App Router de Next.js**, en lugar de hardcodear los datos en Python. Esto permite:
- Escalabilidad sin cambios de código
- Separación clara entre lógica y datos
- Mantenimiento y cambios rápidos
- Simulación realista de una arquitectura con base de datos

### Estructura de archivos
```
backend/
├── fake_backend.py          # Servidor HTTP (sin datos hardcodeados)
├── test_data.py            # Validación de estructura JSON
├── GUIA.md                 # Documentación completa
└── data/
    ├── categories.json     # Array de categorías
    ├── listings.json       # Array de listings principales
    └── rooms/             # Rutas dinámicas por ID
        ├── 1/data.json
        ├── 2/data.json
        ├── 3/data.json
        ├── 4/data.json
        ├── 5/data.json
        └── 6/data.json
```

### Endpoints
| Endpoint | Origen | Descripción |
|----------|--------|-------------|
| `GET /health` | - | Estado del servidor |
| `GET /categories` | `data/categories.json` | Todas las categorías |
| `GET /listings` | `data/listings.json` | Todos los listings |
| `GET /rooms` | `data/rooms/*/data.json` | Todos los rooms |
| `GET /rooms/<id>` | `data/rooms/<id>/data.json` | Room específico por ID |

### Cómo agregar datos nuevos
**Para agregar un room:**
1. Crear carpeta: `backend/data/rooms/7/`
2. Crear archivo: `backend/data/rooms/7/data.json`
3. Agregar contenido con estructura de Room
4. El backend lo sirve automáticamente en `/rooms/7`

**Validación:**
```bash
python backend/test_data.py
```

### Ventajas de esta arquitectura
✅ No requiere editar código Python  
✅ Fácil agregar/modificar datos  
✅ Escalable sin cambios de lógica  
✅ Similar a estructura real con DB  
✅ Prototipado rápido  
