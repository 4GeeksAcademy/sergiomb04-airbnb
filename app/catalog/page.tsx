"use client";

import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Navbar } from "@/components/navbar";
import { fetchListings } from "@/lib/fake-backend-client";
import type { Listing } from "@/types/listing";

type SortOrder = "asc" | "desc";

const CatalogPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const nextListings = await fetchListings();

        if (!isMounted) {
          return;
        }

        setListings(nextListings);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        const message =
          loadError instanceof Error
            ? loadError.message
            : "No se pudo conectar con el backend simulado.";
        setError(message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadListings();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      return sortOrder === "asc"
        ? a.priceValue - b.priceValue
        : b.priceValue - a.priceValue;
    });
  }, [sortOrder, listings]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-14 pt-6 md:px-6 md:pt-10">
        <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-stone-800">
            {sortedListings.length} resultados disponibles
          </p>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            Ordenar por precio
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
              className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-800"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </label>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {loading ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
                Cargando catálogo...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
                Error al cargar datos: {error}
              </div>
            ) : (
              sortedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </div>

          <aside className="rounded-2xl border border-stone-200 bg-stone-100 p-4 shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="flex h-full min-h-60 flex-col rounded-xl border border-dashed border-stone-300 bg-stone-200 p-4">
              <p className="text-sm font-semibold text-stone-700">Mapa</p>
              <p className="mt-2 text-xs text-stone-600">
                Placeholder de mapa para el catálogo.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-stone-700">
                {sortedListings.map((listing) => (
                  <li key={listing.id}>
                    {listing.city}: {listing.lat.toFixed(2)}, {listing.lng.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
