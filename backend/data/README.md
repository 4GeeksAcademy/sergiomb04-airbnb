# Backend Data Structure

Este directorio contiene la estructura de datos dinámica para el backend fake de Airbnb, similar al App Router de Next.js pero usando archivos `data.json`.

## Estructura

```
data/
├── categories.json       # Array de categorías
├── listings.json        # Array de listings principales
└── rooms/              # Rooms dinámicas por ID
    ├── 1/
    │   └── data.json    # Room con ID 1
    ├── 2/
    │   └── data.json    # Room con ID 2
    └── ...
```

## Endpoints

- `GET /health` → Status del servidor
- `GET /categories` → Lee `categories.json`
- `GET /listings` → Lee `listings.json`
- `GET /rooms` → Lee todos los `data.json` en carpetas numeradas
- `GET /rooms/<id>` → Lee `rooms/<id>/data.json`

## Cómo agregar un nuevo room

1. Crea una carpeta con el ID del room: `rooms/7/`
2. Dentro, crea un archivo `data.json` con la estructura:

```json
{
  "id": 7,
  "title": "Tu room",
  "location": "Ciudad, País",
  "rating": 4.8,
  "reviews": 100,
  "pricePerNight": 150,
  "host": {
    "name": "Nombre del anfitrión",
    "years": 5,
    "avatar": "/img/avatar.jpeg"
  },
  "images": ["/img/1.jpeg", "/img/2.jpeg"],
  "amenities": [
    {"icon": "📶", "label": "Wifi rápido"},
    {"icon": "🍳", "label": "Cocina"}
  ]
}
```

El backend cargará automáticamente el archivo en el endpoint `/rooms/7`.

## Ventajas del nuevo sistema

- ✅ Datos no hardcodeados
- ✅ Fácil de escalar (agrega carpetas sin cambiar código)
- ✅ Similar a Next.js App Router (convención clara)
- ✅ Realista (como si vinieran de una DB)
- ✅ Fácil de modificar (edita JSONs sin tocar Python)
