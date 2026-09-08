"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Camera, X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { pauseBackgroundMusic, resumeBackgroundMusic } from "@/hooks/useAudio";
import type { GalleryItem } from "@/types/gallery";

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
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow">
                <Play className="w-5 h-5 text-charcoal ml-0.5" />
              </div>
            </div>
            <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-1 text-[11px] font-medium text-white shadow z-10">
              <Play className="w-3 h-3 fill-white" />
              <span>Putar Video</span>
            </div>
          </div>
        ) : (
          <div className="relative aspect-auto bg-slate-100 min-h-[160px]">
            {item.src ? (
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={500}
                className="w-full h-auto object-cover"
              />
            ) : null}
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

export interface GallerySectionProps {
  items?: GalleryItem[];
}

export function formatCategoryLabel(cat?: string | null): string {
  if (!cat) return "";
  return cat
    .split(/([ -])/)
    .map((part) =>
      part.length > 0
        ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        : part
    )
    .join("");
}

export function GallerySection({ items = [] }: GallerySectionProps = {}) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  // Dapatkan daftar kategori dinamis dari item (format kapital & deduplikasi case-insensitive)
  const categoryMap = new Map<string, string>();
  items.forEach((i) => {
    if (i.category) {
      const formatted = formatCategoryLabel(i.category);
      const lower = formatted.toLowerCase();
      if (!categoryMap.has(lower)) {
        categoryMap.set(lower, formatted);
      }
    }
  });

  const categories = ["Semua", ...Array.from(categoryMap.values())];

  const filteredItems =
    activeCategory.toLowerCase() === "semua"
      ? items
      : items.filter(
          (item) =>
            formatCategoryLabel(item.category).toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    if (filteredItems[index]?.type === "video") {
      pauseBackgroundMusic();
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    resumeBackgroundMusic();
  };

  const goNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const nextIdx = (prev + 1) % filteredItems.length;
      if (filteredItems[nextIdx]?.type === "video") {
        pauseBackgroundMusic();
      } else {
        resumeBackgroundMusic();
      }
      return nextIdx;
    });
  };

  const goPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const prevIdx = (prev - 1 + filteredItems.length) % filteredItems.length;
      if (filteredItems[prevIdx]?.type === "video") {
        pauseBackgroundMusic();
      } else {
        resumeBackgroundMusic();
      }
      return prevIdx;
    });
  };

  if (items.length === 0) return null;

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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory.toLowerCase() === category.toLowerCase()
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
              <div className="relative w-full rounded-xl overflow-hidden bg-black/90 shadow-2xl">
                {/* Header video: judul, deskripsi & tombol un-mute (di atas agar tidak menutupi kontrol bawah) */}
                <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex items-start justify-between gap-3 pointer-events-none">
                  <div className="text-left pr-4">
                    <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 line-clamp-2 drop-shadow">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoMuted(!isVideoMuted);
                    }}
                    className="pointer-events-auto shrink-0 px-3.5 py-2 rounded-full bg-pink-primary/95 hover:bg-pink-dark text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all cursor-pointer mr-10 sm:mr-12"
                    title={isVideoMuted ? "Hidupkan Suara Video" : "Matikan Suara Video"}
                  >
                    {isVideoMuted ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Hidupkan Suara</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-white animate-pulse" />
                        <span>Suara Aktif</span>
                      </>
                    )}
                  </button>
                </div>

                <video
                  key={filteredItems[lightboxIndex].src}
                  src={filteredItems[lightboxIndex].src}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl mx-auto"
                  controls
                  autoPlay
                  playsInline
                  muted={isVideoMuted}
                  onPlay={() => pauseBackgroundMusic()}
                  onPause={() => resumeBackgroundMusic()}
                  onEnded={() => resumeBackgroundMusic()}
                />
              </div>
            ) : filteredItems[lightboxIndex].src ? (
              <>
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
                {/* Caption untuk gambar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white font-semibold text-lg">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </>
            ) : null}
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
                ) : item.src ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
