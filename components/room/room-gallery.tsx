import Image from "next/image";

type RoomGalleryProps = {
  images: string[];
  title: string;
  imageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const RoomGallery = ({
  images,
  title,
  imageIndex,
  onPrevious,
  onNext,
}: RoomGalleryProps) => {
  const currentImage = images[imageIndex];

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={currentImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-between border-t border-stone-200 p-3 text-sm">
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-full border border-stone-300 px-3 py-1.5 text-stone-800"
        >
          Anterior
        </button>
        <p className="text-stone-600">
          {imageIndex + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-stone-300 px-3 py-1.5 text-stone-800"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};
