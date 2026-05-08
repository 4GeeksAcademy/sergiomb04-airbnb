export type ListingCategory = "playa" | "mansiones" | "tendencias" | "cabanas" | "diseno";

export type Listing = {
  id: number;
  city: string;
  title: string;
  dates: string;
  type: string;
  price: string;
  priceValue: number;
  rating: number;
  image: string;
  category: ListingCategory;
  lat: number;
  lng: number;
};

export type Category = {
  key: ListingCategory;
  label: string;
  icon: string;
};
