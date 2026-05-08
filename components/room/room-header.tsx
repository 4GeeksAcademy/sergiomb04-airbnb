type RoomHeaderProps = {
  title: string;
  rating: number;
  reviews: number;
  location: string;
};

export const RoomHeader = ({
  title,
  rating,
  reviews,
  location,
}: RoomHeaderProps) => {
  return (
    <header className="border-b border-stone-200 pb-5">
      <h1 className="text-3xl font-semibold text-stone-900 md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-stone-700">
        ★ {rating} · {reviews} reseñas · {location}
      </p>
    </header>
  );
};
