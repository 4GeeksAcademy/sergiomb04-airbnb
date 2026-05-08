import { Footer } from "@/components/footer";
import { aboutFacts } from "@/components/mock-data";
import { Navbar } from "@/components/navbar";

const storySections = [
  {
    title: "Nacimos para viajar mejor",
    text: "Creamos una experiencia visual inspirada en Airbnb para aprender arquitectura de componentes y diseño de interfaces modernas con React.",
  },
  {
    title: "Producto centrado en personas",
    text: "Cada sección está pensada para que los contenidos respiren: tipografía clara, ritmo vertical y bloques que se leen bien en móvil.",
  },
  {
    title: "Aprender construyendo",
    text: "Este clon prioriza la práctica: App Router, componentes pequeños, reutilización y estilos utilitarios con Tailwind CSS.",
  },
];

const SobreNosotrosPage = () => {
  
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
            Sobre nosotros
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight font-semibold text-stone-900 md:text-5xl">
            Diseñando una experiencia tipo Airbnb, paso a paso.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
            Una práctica enfocada en diseño visual, composición de interfaz y
            estructura de proyecto en Next.js 16.
          </p>
        </section>

        {storySections.map((section, index) => (
          <section
            key={section.title}
            className={`${index % 2 === 0 ? "bg-white" : "bg-[#f2f2f2]"
              } py-20`}
          >
            <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
              <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
                {section.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600 md:text-base">
                {section.text}
              </p>
            </div>
          </section>
        ))}

        <section className="mx-auto max-[90%] px-4 py-10 md:p-14">
          <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
            Datos que nos definen
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {aboutFacts.map((fact) => (
              <article
                key={fact.title}
                className="rounded-2xl bg-white p-5 overflow-hidden"
              >
                <div className="flex flex-col p-4 min-w-0">
                  <h3 className="font-sans text-6xl font-semibold text-stone-900 mb-2 break-words">
                    {fact.title}
                  </h3>

                  <p className="mt-3 text-xl leading-6 text-stone-600 break-words">
                    {fact.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SobreNosotrosPage;
