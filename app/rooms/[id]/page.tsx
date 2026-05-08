"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { getRoomById } from "@/components/mock-data";
import { Navbar } from "@/components/navbar";
import type { Room } from "@/types/room";

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const roomId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRoom(getRoomById(roomId));
      setImageIndex(0);
      setLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [roomId]);

  if (loading) {
    return (
      <>
        <Navbar minimal />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 text-sm text-stone-600 md:px-6">
          Cargando detalle de la habitación...
        </main>
        <Footer />
      </>
    );
  }

  if (!room) {
    return (
      <>
        <Navbar minimal />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">
          <p className="text-sm text-stone-700">No se encontró esta habitación.</p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            Volver al catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const currentImage = room.images[imageIndex];

  return (
    <>
      <Navbar minimal />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-6 md:px-6 md:pt-10">
        <Link
          href="/catalog"
          className="mb-5 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
        >
          Volver al catálogo
        </Link>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={currentImage}
              alt={room.title}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center justify-between border-t border-stone-200 p-3 text-sm">
            <button
              type="button"
              onClick={() =>
                setImageIndex((prev) =>
                  prev === 0 ? room.images.length - 1 : prev - 1,
                )
              }
              className="rounded-full border border-stone-300 px-3 py-1.5 text-stone-800"
            >
              Anterior
            </button>
            <p className="text-stone-600">
              {imageIndex + 1} / {room.images.length}
            </p>
            <button
              type="button"
              onClick={() => setImageIndex((prev) => (prev + 1) % room.images.length)}
              className="rounded-full border border-stone-300 px-3 py-1.5 text-stone-800"
            >
              Siguiente
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <header className="border-b border-stone-200 pb-5">
              <h1 className="text-3xl font-semibold text-stone-900 md:text-4xl">
                {room.title}
              </h1>
              <p className="mt-2 text-sm text-stone-700">
                ★ {room.rating} · {room.reviews} reseñas · {room.location}
              </p>
            </header>

            <section className="mt-5 border-b border-stone-200 pb-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-stone-200">
                  <Image
                    src={room.host.avatar}
                    alt={room.host.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    Anfitrión: {room.host.name}
                  </p>
                  <p className="text-sm text-stone-600">
                    {room.host.years} años como anfitrión
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-5">
              <h2 className="text-xl font-semibold text-stone-900">Servicios</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((amenity) => (
                  <article
                    key={amenity.label}
                    className="rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-700"
                  >
                    <span className="mr-2" aria-hidden="true">
                      {amenity.icon}
                    </span>
                    {amenity.label}
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xl font-semibold text-stone-900">
              {room.pricePerNight} € <span className="text-sm font-normal">/ noche</span>
            </p>

            <div className="mt-4 rounded-xl border border-stone-200 p-4">
              <p className="text-sm font-medium text-stone-800">Huéspedes</p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  className="h-9 w-9 rounded-full border border-stone-300 text-stone-800"
                >
                  -
                </button>
                <p className="min-w-10 text-center text-sm font-semibold text-stone-800">
                  {guests}
                </p>
                <button
                  type="button"
                  onClick={() => setGuests((prev) => Math.min(8, prev + 1))}
                  className="h-9 w-9 rounded-full border border-stone-300 text-stone-800"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-xs text-stone-500">Rango permitido: 1 a 8</p>
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Reservar ahora
            </button>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
