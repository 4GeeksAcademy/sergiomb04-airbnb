type RoomBookingCardProps = {
  pricePerNight: number;
  guests: number;
  onGuestsDecrement: () => void;
  onGuestsIncrement: () => void;
};

export const RoomBookingCard = ({
  pricePerNight,
  guests,
  onGuestsDecrement,
  onGuestsIncrement,
}: RoomBookingCardProps) => {
  return (
    <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <p className="text-xl font-semibold text-stone-900">
        {pricePerNight} € <span className="text-sm font-normal">/ noche</span>
      </p>

      <div className="mt-4 rounded-xl border border-stone-200 p-4">
        <p className="text-sm font-medium text-stone-800">Huéspedes</p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onGuestsDecrement}
            className="h-9 w-9 rounded-full border border-stone-300 text-stone-800"
          >
            -
          </button>
          <p className="min-w-10 text-center text-sm font-semibold text-stone-800">
            {guests}
          </p>
          <button
            type="button"
            onClick={onGuestsIncrement}
            className="h-9 w-9 rounded-full border border-stone-300 text-stone-800"
          >
            +
          </button>
        </div>
        <p className="mt-2 text-xs text-stone-500">Rango permitido: 1 a 8</p>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
      >
        Reservar ahora
      </button>
    </aside>
  );
};
