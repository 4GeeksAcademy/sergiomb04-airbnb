import type { Category, Listing } from "@/types/listing";
import type { Room } from "@/types/room";

const FALLBACK_API_BASE_URL = "http://12.0.0.1:8001";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_FAKE_BACKEND_URL ?? FALLBACK_API_BASE_URL;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`);

  if (!response.ok) {
    throw new Error(`Backend error ${response.status} en ${path}`);
  }

  return (await response.json()) as T;
}

export function fetchCategories() {
  return apiGet<Category[]>("/categories");
}

export function fetchListings() {
  return apiGet<Listing[]>("/listings");
}

export function fetchRoomById(id: number) {
  return apiGet<Room>(`/rooms/${id}`);
}
