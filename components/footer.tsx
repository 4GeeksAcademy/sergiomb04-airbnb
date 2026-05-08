import Link from "next/link";

type FooterSectionProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const FooterSection = ({ title, links }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-800">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-stone-600">
        {links.map((link) => (
          <li key={link.label}>
            <Link className="transition hover:text-stone-900" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SocialLink = ({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-stone-900"
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <FooterSection
          title="Asistencia"
          links={[
            { label: "Centro de ayuda", href: "#" },
            { label: "Opciones de cancelación", href: "#" },
            { label: "Accesibilidad", href: "#" },
          ]}
        />
        <FooterSection
          title="Comunidad"
          links={[
            { label: "AirCover", href: "#" },
            { label: "Lucha contra la discriminación", href: "#" },
            { label: "Invita a un amigo", href: "#" },
          ]}
        />
        <FooterSection
          title="Alojar"
          links={[
            { label: "Pon tu casa en Airbnb", href: "#" },
            { label: "Recursos para anfitriones", href: "#" },
            { label: "Foro de la comunidad", href: "#" },
          ]}
        />
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-800">
            Síguenos
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            <SocialLink label="Facebook" href="https://facebook.com" icon="◉" />
            <SocialLink label="X" href="https://x.com" icon="✕" />
            <SocialLink label="Instagram" href="https://instagram.com" icon="◌" />
          </div>
        </div>
      </div>
      <div className="border-t border-stone-200 px-4 py-4 text-center text-xs text-stone-500 md:px-6">
        © 2026 Airbnb Clone. Proyecto educativo con Next.js y Tailwind CSS.
      </div>
    </footer>
  );
};
