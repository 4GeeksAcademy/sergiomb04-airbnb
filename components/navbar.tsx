"use client";

import Link from "next/link";
import { AirbnbLogo } from "@/components/airbnb-logo";

type NavbarProps = {
  minimal?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export const Navbar = ({
  minimal = false,
  searchValue,
  onSearchChange,
}: NavbarProps) => {
  if (minimal) {
    return (
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-500 transition hover:text-rose-600"
          >
            <AirbnbLogo className="h-8 w-8" />
            <span className="text-xl font-semibold tracking-tight text-rose-500">
              airbnb
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
        <Link
          href="/"
          className="hidden items-center gap-2 text-rose-500 transition hover:text-rose-600 md:inline-flex"
        >
          <AirbnbLogo className="h-8 w-8" />
          <span className="text-2xl font-semibold tracking-tight">airbnb</span>
        </Link>

        {typeof onSearchChange === "function" ? (
          <div className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 shadow-sm md:max-w-md">
            <label htmlFor="home-search" className="sr-only">
              Buscar alojamientos
            </label>
            <input
              id="home-search"
              value={searchValue ?? ""}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar ciudad o alojamiento"
              className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-500"
            />
          </div>
        ) : (
          <button
            type="button"
            className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-left text-sm text-stone-700 shadow-sm transition hover:shadow md:max-w-md"
          >
            <span className="font-medium text-stone-900">Explora destinos</span>
            <span className="mx-2 text-stone-300">|</span>
            <span>Semana flexible</span>
            <span className="mx-2 text-stone-300">|</span>
            <span className="text-stone-500">Añade huéspedes</span>
          </button>
        )}

        <nav className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/sobre-nosotros"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 md:inline-block"
          >
            Sobre nosotros
          </Link>
          <Link
            href="/catalog"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 md:inline-block"
          >
            Catálogo
          </Link>
          <Link
            href="/lugares/barcelona"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 md:inline-block"
          >
            Barcelona
          </Link>
          <button
            type="button"
            className="rounded-full border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:shadow"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            aria-label="Más enlaces"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 shadow-sm transition hover:shadow"
          >
            <span className="text-lg leading-none">☰</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
