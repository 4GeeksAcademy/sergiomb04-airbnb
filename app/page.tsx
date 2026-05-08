"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { ListingCard } from "@/components/listing-card";
import { Navbar } from "@/components/navbar";
import { RegionStrip } from "@/components/region-strip";
import { fetchCategories, fetchListings } from "@/lib/fake-backend-client";
import type { Category, Listing, ListingCategory } from "@/types/listing";

const Home = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ListingCategory | "all">(
    "all",
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [visibleListings, setVisibleListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyFilters = (
    source: Listing[],
    searchText: string,
    category: ListingCategory | "all",
  ) => {
    const normalized = searchText.trim().toLowerCase();
    const next = source.filter((listing) => {
      const matchesSearch =
        listing.city.toLowerCase().includes(normalized) ||
        listing.title.toLowerCase().includes(normalized);
      const matchesCategory =
        category === "all" ? true : listing.category === category;
      return matchesSearch && matchesCategory;
    });
    setVisibleListings(next);
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [nextCategories, nextListings] = await Promise.all([
          fetchCategories(),
          fetchListings(),
        ]);

        if (!isMounted) {
          return;
        }

        setCategories(nextCategories);
        setAllListings(nextListings);
        setVisibleListings(nextListings);
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

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    applyFilters(allListings, value, activeCategory);
  };

  const handleCategorySelect = (category: ListingCategory | "all") => {
    setActiveCategory(category);
    applyFilters(allListings, query, category);
  };

  return (
    <>
      <Navbar searchValue={query} onSearchChange={handleSearchChange} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-14 pt-6 md:px-6 md:pt-10">
        <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm md:p-10">
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
              Airbnb Clone
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-5xl">
              Alojamientos para vacaciones con look and feel real.
            </h1>
            <p className="mt-4 text-sm leading-6 text-stone-600 md:text-base">
              Construido con Next.js 16 y Tailwind CSS siguiendo un enfoque
              mobile-first. Explora destinos, filtra por categoría y revisa ofertas
              destacadas inspiradas en Airbnb.
            </p>
          </div>
        </section>

        <RegionStrip
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
              Quédate en Barcelona
            </h2>
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
              Preview oferta
            </p>
          </div>
          {loading ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
              Cargando alojamientos...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
              Error al cargar datos: {error}
            </div>
          ) : visibleListings.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
              No hay resultados con los filtros actuales.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
