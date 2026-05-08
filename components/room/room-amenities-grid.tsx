import type { Room } from "@/types/room";

type RoomAmenitiesGridProps = {
  amenities: Room["amenities"];
};

export const RoomAmenitiesGrid = ({ amenities }: RoomAmenitiesGridProps) => {
  return (
    <section className="mt-5">
      <h2 className="text-xl font-semibold text-stone-900">Servicios</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {amenities.map((amenity) => (
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
  );
};
