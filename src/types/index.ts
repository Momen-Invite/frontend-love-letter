export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface WishCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: "Semua" | "Spesial" | "Cinta" | "Momen" | "Jalan-jalan";
  type: "image" | "video";
  src: string;
}

export interface Quote {
  id: number;
  text: string;
}
