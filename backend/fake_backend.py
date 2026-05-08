from __future__ import annotations

import json
import os
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

HOST = "127.0.0.1"
PORT = 8001

# Obtener la ruta del directorio de datos
DATA_DIR = Path(__file__).parent / "data"


def load_json_file(file_path: Path) -> Any:
  """Carga un archivo JSON con manejo de errores."""
  try:
    with open(file_path, "r", encoding="utf-8") as f:
      return json.load(f)
  except (FileNotFoundError, json.JSONDecodeError) as e:
    print(f"[fake-backend] Error loading {file_path}: {e}")
    return None


def get_categories() -> list[dict[str, Any]]:
  """Carga categorías desde categories.json."""
  categories = load_json_file(DATA_DIR / "categories.json")
  return categories if categories else []


def get_listings() -> list[dict[str, Any]]:
  """Carga listings desde listings.json."""
  listings = load_json_file(DATA_DIR / "listings.json")
  return listings if listings else []


def get_all_rooms() -> list[dict[str, Any]]:
  """Carga todos los rooms desde carpetas individuales."""
  rooms = []
  rooms_dir = DATA_DIR / "rooms"

  if not rooms_dir.exists():
    return rooms

  # Itera sobre las carpetas numeradas
  for item in sorted(rooms_dir.iterdir()):
    if item.is_dir() and item.name.isdigit():
      data_file = item / "data.json"
      room_data = load_json_file(data_file)
      if room_data:
        rooms.append(room_data)

  return rooms


def get_room_by_id(room_id: int) -> dict[str, Any] | None:
  """Carga un room específico desde data/rooms/<id>/data.json."""
  room_file = DATA_DIR / "rooms" / str(room_id) / "data.json"
  return load_json_file(room_file)


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
      self._send_json(get_categories())
      return

    if path == "/listings":
      self._send_json(get_listings())
      return

    if path == "/rooms":
      self._send_json(get_all_rooms())
      return

    room_match = re.fullmatch(r"/rooms/(\d+)", path)
    if room_match:
      room_id = int(room_match.group(1))
      room = get_room_by_id(room_id)
      if room is None:
        self._send_json({"error": "Room not found"}, status=404)
        return
      self._send_json(room)
      return

    self._send_json({"error": "Not found"}, status=404)


def main() -> None:
  server = ThreadingHTTPServer((HOST, PORT), FakeBackendHandler)
  print(f"[fake-backend] running on http://{HOST}:{PORT}")
  print(f"[fake-backend] data directory: {DATA_DIR}")
  print("[fake-backend] endpoints: /health, /categories, /listings, /rooms, /rooms/<id>")
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    print("\n[fake-backend] detenido")
  finally:
    server.server_close()


if __name__ == "__main__":
  main()
