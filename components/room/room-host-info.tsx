import Image from "next/image";
import type { Room } from "@/types/room";

type RoomHostInfoProps = {
  host: Room["host"];
};

export const RoomHostInfo = ({ host }: RoomHostInfoProps) => {
  return (
    <section className="mt-5 border-b border-stone-200 pb-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-stone-200">
          <Image
            src={host.avatar}
            alt={host.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Anfitrión: {host.name}</p>
          <p className="text-sm text-stone-600">{host.years} años como anfitrión</p>
        </div>
      </div>
    </section>
  );
};
