"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { getRoomById } from "@/components/mock-data";
import { Navbar } from "@/components/navbar";
import { RoomAmenitiesGrid } from "@/components/room/room-amenities-grid";
import { RoomBookingCard } from "@/components/room/room-booking-card";
import { RoomGallery } from "@/components/room/room-gallery";
import { RoomHeader } from "@/components/room/room-header";
import { RoomHostInfo } from "@/components/room/room-host-info";
import type { Room } from "@/types/room";

const RoomDetailPage = () => {
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

        <RoomGallery
          images={room.images}
          title={room.title}
          imageIndex={imageIndex}
          onPrevious={() =>
            setImageIndex((prev) =>
              prev === 0 ? room.images.length - 1 : prev - 1,
            )
          }
          onNext={() => setImageIndex((prev) => (prev + 1) % room.images.length)}
        />

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <RoomHeader
              title={room.title}
              rating={room.rating}
              reviews={room.reviews}
              location={room.location}
            />

            <RoomHostInfo host={room.host} />

            <RoomAmenitiesGrid amenities={room.amenities} />
          </div>

          <RoomBookingCard
            pricePerNight={room.pricePerNight}
            guests={guests}
            onGuestsDecrement={() => setGuests((prev) => Math.max(1, prev - 1))}
            onGuestsIncrement={() => setGuests((prev) => Math.min(8, prev + 1))}
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RoomDetailPage;
