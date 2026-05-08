import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";

type ListingCardProps = {
  listing: Listing;
  href?: string;
};

export const ListingCard = ({
  listing,
  href = `/rooms/${listing.id}`,
}: ListingCardProps) => {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-stone-900">{listing.city}</p>
          <p className="text-sm text-stone-700">★ {listing.rating}</p>
        </div>
        <h3 className="line-clamp-2 text-sm text-stone-800">{listing.title}</h3>
        <p className="text-sm text-stone-500">{listing.dates}</p>
        <p className="text-sm text-stone-500">{listing.type}</p>
        <p className="pt-1 text-sm font-semibold text-stone-900">{listing.price}</p>
      </div>
    </Link>
  );
};
