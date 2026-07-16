export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
  category: string;
}

export interface GalleryManifest {
  categories: GalleryCategory[];
  items: GalleryItem[];
  generatedAt: string;
}
