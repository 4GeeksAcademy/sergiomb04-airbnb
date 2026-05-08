export type Room = {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  host: {
    name: string;
    years: number;
    avatar: string;
  };
  images: string[];
  amenities: Array<{
    icon: string;
    label: string;
  }>;
};
