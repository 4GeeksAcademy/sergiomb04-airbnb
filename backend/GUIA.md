# 🏗️ Backend Dinámico - Guía de Uso

## Cambios Realizados

El backend ha sido refactorizado para ser **completamente dinámico** usando archivos JSON, similar al **App Router de Next.js**. Ya no hay datos hardcodeados en Python.

## Estructura Nueva

```
backend/
├── fake_backend.py        # Backend Python (sin datos hardcodeados)
├── test_data.py          # Script para validar estructura
└── data/
    ├── categories.json    # [categoria1, categoria2, ...]
    ├── listings.json      # [listing1, listing2, ...]
    └── rooms/            # Rutas dinámicas por ID
        ├── 1/data.json
        ├── 2/data.json
        ├── 3/data.json
        ├── 4/data.json
        ├── 5/data.json
        └── 6/data.json
```

## Endpoints del Backend

El backend lee dinámicamente los archivos JSON:

| Endpoint | Fuente | Descripción |
|----------|--------|-------------|
| `GET /health` | - | Estado del servidor |
| `GET /categories` | `data/categories.json` | Lista de categorías |
| `GET /listings` | `data/listings.json` | Lista de listings principales |
| `GET /rooms` | `data/rooms/*/data.json` | Todos los rooms |
| `GET /rooms/<id>` | `data/rooms/<id>/data.json` | Room específico por ID |

## Cómo Ejecutar

```bash
# Validar que los datos estén bien formados
python backend/test_data.py

# Iniciar el backend
python backend/fake_backend.py
```

El backend corre en `http://127.0.0.1:8001`

## Cómo Agregar Datos Nuevos

### Agregar una nueva categoría

Edita `backend/data/categories.json`:

```json
[
  {"key": "playa", "label": "Playa", "icon": "🏖"},
  {"key": "montaña", "label": "Montaña", "icon": "⛰"}  // ← Nueva
]
```

### Agregar un nuevo listing

Edita `backend/data/listings.json`:

```json
[
  {
    "id": 7,
    "city": "Madrid",
    "title": "Apartamento en centro",
    "dates": "1-5 oct",
    "type": "Apartamento entero",
    "price": "120 € noche",
    "priceValue": 120,
    "rating": 4.85,
    "image": "/img/img_14.jpeg",
    "category": "diseno",
    "lat": 40.4168,
    "lng": -3.7038
  }
]
```

### Agregar un nuevo room

Crea una carpeta y archivo:

```bash
# 1. Crear carpeta
mkdir -p backend/data/rooms/7

# 2. Crear backend/data/rooms/7/data.json
```

Contenido de `backend/data/rooms/7/data.json`:

```json
{
  "id": 7,
  "title": "Suite en el centro de Madrid",
  "location": "Madrid, España",
  "rating": 4.88,
  "reviews": 156,
  "pricePerNight": 120,
  "host": {
    "name": "Carlos",
    "years": 9,
    "avatar": "/img/img_14.jpeg"
  },
  "images": ["/img/img_0.jpeg", "/img/img_1.jpg"],
  "amenities": [
    {"icon": "📶", "label": "Wifi rápido"},
    {"icon": "🍳", "label": "Cocina equipada"},
    {"icon": "🛏", "label": "Cama king"}
  ]
}
```

Al instante, el backend sirve en `/rooms/7` sin cambios en el código.

## Ventajas

✅ **Sin hardcoding** - Edita JSON, no código Python  
✅ **Escalable** - Agregar datos es trivial  
✅ **Fácil de entender** - Estructura clara y predecible  
✅ **Realista** - Similar a un servidor de verdad  
✅ **Mantenible** - Datos separados de la lógica  
✅ **Extensible** - Fácil agregar campos nuevos  

## Validación

Siempre que hagas cambios en los JSON, puedes validar:

```bash
python backend/test_data.py
```

Esto verifica que todos los archivos JSON sean válidos.

## Próximos Pasos Posibles

- Agregar endpoints para crear/editar/eliminar rooms
- Integrar con una base de datos real
- Agregar autenticación y permisos
- Agregar filtros y búsqueda
