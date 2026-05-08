import Image from "next/image";
import { Footer } from "@/components/footer";
import { barcelonaGallery } from "@/components/mock-data";
import { Navbar } from "@/components/navbar";

const BarcelonaPage = () => {
  return (
    <>
      <Navbar minimal />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-6 md:px-6 md:pt-10">
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
            Lugar concreto
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-900 md:text-5xl">
            Barcelona, España
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600 md:text-base">
            Un alojamiento urbano con diseño interior moderno, espacios cálidos y
            una vista privilegiada de la ciudad.
          </p>
        </section>

        <section className="mt-8">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
            <Image
              src="/img/img_14.png"
              alt="Fachada del alojamiento en Barcelona"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {barcelonaGallery.map((item) => (
            <article
              key={item.image}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="p-4 text-sm text-stone-700">{item.label}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BarcelonaPage;
