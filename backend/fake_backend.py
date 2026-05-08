#!/usr/bin/env python3
"""Backend ficticio para datos de listings y rooms.

Uso:
  python backend/fake_backend.py

Endpoints:
  GET /health
  GET /categories
  GET /listings
  GET /rooms
  GET /rooms/<id>
"""

from __future__ import annotations

import json
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

HOST = "127.0.0.1"
PORT = 8001

CATEGORIES: list[dict[str, Any]] = [
    {"key": "playa", "label": "Playa", "icon": "🏖"},
    {"key": "mansiones", "label": "Mansiones", "icon": "🏛"},
    {"key": "tendencias", "label": "Tendencias", "icon": "🔥"},
    {"key": "cabanas", "label": "Cabañas", "icon": "🏡"},
    {"key": "diseno", "label": "Diseño", "icon": "🎨"},
]

LISTINGS: list[dict[str, Any]] = [
    {
        "id": 1,
        "city": "Milan",
        "title": "Apartamento diseño en Porta Romana",
        "dates": "12-17 jun",
        "type": "Apartamento entero",
        "price": "115 € noche",
        "priceValue": 115,
        "rating": 4.82,
        "image": "/img/img_0.jpeg",
        "category": "diseno",
        "lat": 45.4566,
        "lng": 9.2048,
    },
    {
        "id": 2,
        "city": "Barcelona",
        "title": "Piso luminoso con balcón en el centro",
        "dates": "20-25 jun",
        "type": "Superanfitrión",
        "price": "142 € noche",
        "priceValue": 142,
        "rating": 4.9,
        "image": "/img/img_1.jpg",
        "category": "tendencias",
        "lat": 41.3874,
        "lng": 2.1686,
    },
    {
        "id": 3,
        "city": "Barcelona",
        "title": "Hotel boutique con rooftop",
        "dates": "5-9 jul",
        "type": "Habitación privada",
        "price": "128 € noche",
        "priceValue": 128,
        "rating": 4.76,
        "image": "/img/img_2.jpeg",
        "category": "playa",
        "lat": 41.3769,
        "lng": 2.1921,
    },
    {
        "id": 4,
        "city": "Niza",
        "title": "Suite moderna junto al casco histórico",
        "dates": "2-7 ago",
        "type": "Loft",
        "price": "169 € noche",
        "priceValue": 169,
        "rating": 4.71,
        "image": "/img/img_3.jpeg",
        "category": "mansiones",
        "lat": 43.7034,
        "lng": 7.2663,
    },
    {
        "id": 5,
        "city": "Roma",
        "title": "Terraza privada con vistas urbanas",
        "dates": "15-20 ago",
        "type": "Apartamento entero",
        "price": "154 € noche",
        "priceValue": 154,
        "rating": 4.89,
        "image": "/img/img_5.png",
        "category": "cabanas",
        "lat": 41.9029,
        "lng": 12.4963,
    },
    {
        "id": 6,
        "city": "Barcelona",
        "title": "Apartamento premium con jacuzzi",
        "dates": "10-13 sep",
        "type": "Favorito entre huéspedes",
        "price": "206 € noche",
        "priceValue": 206,
        "rating": 4.95,
        "image": "/img/img_8.jpeg",
        "category": "mansiones",
        "lat": 41.3912,
        "lng": 2.1648,
    },
]

ROOMS: list[dict[str, Any]] = [
    {
        "id": 1,
        "title": "Apartamento diseño en Porta Romana",
        "location": "Milán, Italia",
        "rating": 4.82,
        "reviews": 121,
        "pricePerNight": 115,
        "host": {
            "name": "Giulia",
            "years": 4,
            "avatar": "/img/img_12.jpeg",
        },
        "images": ["/img/img_0.jpeg", "/img/img_6.jpeg", "/img/img_9.jpeg"],
        "amenities": [
            {"icon": "📶", "label": "Wifi rápido"},
            {"icon": "🍳", "label": "Cocina equipada"},
            {"icon": "❄", "label": "Aire acondicionado"},
            {"icon": "🧺", "label": "Lavadora"},
            {"icon": "🛗", "label": "Ascensor"},
            {"icon": "🧳", "label": "Check-in autónomo"},
        ],
    },
    {
        "id": 2,
        "title": "Piso luminoso con balcón en el centro",
        "location": "Barcelona, España",
        "rating": 4.9,
        "reviews": 204,
        "pricePerNight": 142,
        "host": {
            "name": "Laia",
            "years": 6,
            "avatar": "/img/img_13.jpeg",
        },
        "images": ["/img/img_1.jpg", "/img/img_10.jpeg", "/img/img_11.jpeg"],
        "amenities": [
            {"icon": "📶", "label": "Wifi rápido"},
            {"icon": "🌇", "label": "Balcón"},
            {"icon": "🚇", "label": "Cerca de metro"},
            {"icon": "💻", "label": "Zona de trabajo"},
            {"icon": "🧼", "label": "Limpieza incluida"},
            {"icon": "🛏", "label": "Cama queen"},
        ],
    },
    {
        "id": 3,
        "title": "Hotel boutique con rooftop",
        "location": "Barcelona, España",
        "rating": 4.76,
        "reviews": 89,
        "pricePerNight": 128,
        "host": {
            "name": "Marc",
            "years": 3,
            "avatar": "/img/img_12.jpeg",
        },
        "images": ["/img/img_2.jpeg", "/img/img_4.jpeg", "/img/img_7.jpeg"],
        "amenities": [
            {"icon": "🏊", "label": "Rooftop con piscina"},
            {"icon": "☕", "label": "Desayuno incluido"},
            {"icon": "🛎", "label": "Recepción 24h"},
            {"icon": "🚕", "label": "Transfer opcional"},
            {"icon": "❄", "label": "Aire acondicionado"},
            {"icon": "📺", "label": "Smart TV"},
        ],
    },
    {
        "id": 4,
        "title": "Suite moderna junto al casco histórico",
        "location": "Niza, Francia",
        "rating": 4.71,
        "reviews": 97,
        "pricePerNight": 169,
        "host": {
            "name": "Claire",
            "years": 7,
            "avatar": "/img/img_13.jpeg",
        },
        "images": ["/img/img_3.jpeg", "/img/img_6.jpeg", "/img/img_11.jpeg"],
        "amenities": [
            {"icon": "🌊", "label": "A 10 min de la playa"},
            {"icon": "🛏", "label": "Cama king"},
            {"icon": "🍷", "label": "Minibar"},
            {"icon": "📶", "label": "Wifi rápido"},
            {"icon": "🅿", "label": "Parking cercano"},
            {"icon": "🧳", "label": "Check-in autónomo"},
        ],
    },
    {
        "id": 5,
        "title": "Terraza privada con vistas urbanas",
        "location": "Roma, Italia",
        "rating": 4.89,
        "reviews": 166,
        "pricePerNight": 154,
        "host": {
            "name": "Alessandro",
            "years": 5,
            "avatar": "/img/img_12.jpeg",
        },
        "images": ["/img/img_5.png", "/img/img_9.jpeg", "/img/img_10.jpeg"],
        "amenities": [
            {"icon": "🌆", "label": "Terraza privada"},
            {"icon": "🍝", "label": "Cocina completa"},
            {"icon": "🛁", "label": "Bañera"},
            {"icon": "📶", "label": "Wifi rápido"},
            {"icon": "🧼", "label": "Limpieza semanal"},
            {"icon": "🚶", "label": "Centro histórico"},
        ],
    },
    {
        "id": 6,
        "title": "Apartamento premium con jacuzzi",
        "location": "Barcelona, España",
        "rating": 4.95,
        "reviews": 248,
        "pricePerNight": 206,
        "host": {
            "name": "Nora",
            "years": 8,
            "avatar": "/img/img_13.jpeg",
        },
        "images": ["/img/img_8.jpeg", "/img/img_6.jpeg", "/img/img_7.jpeg"],
        "amenities": [
            {"icon": "🛁", "label": "Jacuzzi privado"},
            {"icon": "🍾", "label": "Welcome pack"},
            {"icon": "🌇", "label": "Vistas panorámicas"},
            {"icon": "📶", "label": "Wifi rápido"},
            {"icon": "🛏", "label": "Cama king"},
            {"icon": "🅿", "label": "Parking"},
        ],
    },
]


class FakeBackendHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload: Any, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        path = self.path.rstrip("/") or "/"
        print(f"[fake-backend] GET {path}")

        if path == "/health":
            self._send_json({"status": "ok"})
            return

        if path == "/categories":
            self._send_json(CATEGORIES)
            return

        if path == "/listings":
            self._send_json(LISTINGS)
            return

        if path == "/rooms":
            self._send_json(ROOMS)
            return

        room_match = re.fullmatch(r"/rooms/(\d+)", path)
        if room_match:
            room_id = int(room_match.group(1))
            room = next((item for item in ROOMS if item["id"] == room_id), None)
            if room is None:
                self._send_json({"error": "Room not found"}, status=404)
                return
            self._send_json(room)
            return

        self._send_json({"error": "Not found"}, status=404)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), FakeBackendHandler)
    print(f"[fake-backend] running on http://{HOST}:{PORT}")
    print("[fake-backend] endpoints: /health, /categories, /listings, /rooms, /rooms/<id>")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[fake-backend] detenido")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
