import type { Category, ListingCategory } from "@/types/listing";

type RegionStripProps = {
  categories: Category[];
  activeCategory: ListingCategory | "all";
  onSelect: (category: ListingCategory | "all") => void;
};

export function RegionStrip({
  categories,
  activeCategory,
  onSelect,
}: RegionStripProps) {
  return (
    <section aria-label="Filtros por categoría" className="mt-8">
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <ul className="flex min-w-max gap-2 pb-2 md:gap-3">
          <li>
            <button
              type="button"
              onClick={() => onSelect("all")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === "all"
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900"
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.key}>
              <button
                type="button"
                onClick={() => onSelect(category.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category.key
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:text-stone-900"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">
                  {category.icon}
                </span>
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
