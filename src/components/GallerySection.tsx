"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Camera, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import galleryManifest from "@/lib/gallery-manifest.json";
import type { GalleryManifest, GalleryItem } from "@/types/gallery";

// Load manifest and prepare data
const manifest = galleryManifest as GalleryManifest;
const galleryCategories = ["Semua", ...manifest.categories.map((cat) => cat.label)];
const galleryItems = manifest.items;

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer break-inside-avoid mb-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
      style={{ transitionDelay: `${(index % 5) * 80}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        {item.type === "video" ? (
          <div className="relative aspect-[4/3]">
            <video
              src={item.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => {
                const video = e.target as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                <Play className="w-5 h-5 text-charcoal ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative aspect-auto">
            <Image
              src={item.src}
              alt={item.title}
              width={400}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Overlay with title */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-sm">{item.title}</h3>
          <p className="text-white/80 text-xs mt-0.5 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Number badge */}
        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-charcoal">
          {item.id}
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory.toLowerCase());

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : null
    );
  }, [filteredItems.length]);

  return (
    <section ref={ref} id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">
              Momen Indah Muu
            </span>
            <Camera className="w-5 h-5 text-gold" />
          </div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-charcoal mb-3">
            Momen Indah Muu
          </h2>
          <p className="text-brown-light text-sm max-w-md mx-auto">
            Setiap foto menyimpan cerita, setiap momen adalah hadiah yang tak
            ternilai.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-gradient-to-r from-pink-primary to-pink-dark text-white shadow-md shadow-pink-primary/20"
                  : "bg-white text-brown-light border border-gold/20 hover:border-pink-primary/30 hover:text-pink-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={`${item.category}-${item.id}`}
              item={item}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex].type === "video" ? (
              <video
                src={filteredItems[lightboxIndex].src}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                controls
                autoPlay
                muted
              />
            ) : (
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            )}

            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white font-semibold text-lg">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-white/80 text-sm mt-1">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-xl overflow-x-auto px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm">
            {filteredItems.map((item, i) => (
              <button
                key={`${item.category}-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  i === lightboxIndex
                    ? "border-pink-primary scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {item.type === "video" ? (
                  <div className="w-full h-full bg-charcoal/50 flex items-center justify-center">
                    <Play className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
