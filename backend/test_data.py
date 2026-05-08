#!/usr/bin/env python3
"""Script de prueba para validar la estructura de datos del backend.

Verifica que todos los archivos JSON estén bien formados y accesibles.
"""

import json
from pathlib import Path

def validate_json_file(file_path: Path) -> bool:
  """Valida que un archivo JSON sea válido."""
  try:
    with open(file_path, "r", encoding="utf-8") as f:
      json.load(f)
    print(f"✅ {file_path.relative_to(Path.cwd())}")
    return True
  except Exception as e:
    print(f"❌ {file_path.relative_to(Path.cwd())}: {e}")
    return False

def main():
  data_dir = Path(__file__).parent / "data"
  
  if not data_dir.exists():
    print(f"❌ Data directory not found: {data_dir}")
    return

  print("[backend-test] Validando estructura de datos...\n")

  all_valid = True

  # Validar categorías
  print("Categories:")
  categories_file = data_dir / "categories.json"
  if not validate_json_file(categories_file):
    all_valid = False

  # Validar listings
  print("\nListings:")
  listings_file = data_dir / "listings.json"
  if not validate_json_file(listings_file):
    all_valid = False

  # Validar rooms
  print("\nRooms:")
  rooms_dir = data_dir / "rooms"
  if rooms_dir.exists():
    room_files = sorted(rooms_dir.glob("*/data.json"))
    if not room_files:
      print("❌ No room data files found")
      all_valid = False
    else:
      for room_file in room_files:
        if not validate_json_file(room_file):
          all_valid = False
  else:
    print(f"❌ Rooms directory not found: {rooms_dir}")
    all_valid = False

  print("\n" + "="*50)
  if all_valid:
    print("✅ Todas las validaciones pasaron!")
    print("\nPrueba ahora el backend:")
    print("  python backend/fake_backend.py")
  else:
    print("❌ Algunas validaciones fallaron")

if __name__ == "__main__":
  main()
