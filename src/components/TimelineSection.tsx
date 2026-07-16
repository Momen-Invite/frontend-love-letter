"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Camera, X } from "lucide-react";
import { timelineItems } from "@/lib/data";

function TimelineCard({
  item,
  index,
  onImageClick,
}: {
  item: (typeof timelineItems)[0];
  index: number;
  onImageClick: () => void;
}) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>(0.2);
  const isLeft = index % 2 === 0;
  const rotation = isLeft ? "-2.5deg" : "2deg";

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Card */}
      <div
        className={`flex-1 transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : `opacity-0 ${isLeft ? "-translate-x-12" : "translate-x-12"}`
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div
          className="bg-white p-2.5 pb-10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto w-full cursor-pointer"
          style={{ transform: `rotate(${rotation})` }}
          onClick={onImageClick}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="mt-3 text-center px-2">
            <h3 className="font-serif italic text-base text-charcoal">
              {item.title}
            </h3>
            <p className="text-brown-light text-xs mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline dot (visible on md+) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-pink-primary/20 flex items-center justify-center border-2 border-pink-primary/40">
          <Heart className="w-3.5 h-3.5 text-pink-primary fill-pink-primary" />
        </div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export function TimelineSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="timeline" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">
              Momen Tak Terlupakan
            </span>
            <Camera className="w-5 h-5 text-gold" />
          </div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-charcoal mb-3">
            Momen Tak Terlupakan
          </h2>
          <p className="text-brown-light text-sm max-w-md mx-auto">
            Setiap detik bersamamu adalah lembaran berharga dalam buku hidupku.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical dashed line (visible on md+) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-pink-primary/30 -translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                onImageClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-4 pb-16 shadow-2xl transform rotate-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={timelineItems[lightboxIndex].image}
                  alt={timelineItems[lightboxIndex].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 text-center px-4">
                <h3 className="font-serif italic text-2xl text-charcoal mb-2">
                  {timelineItems[lightboxIndex].title}
                </h3>
                <p className="text-brown-light text-base leading-relaxed">
                  {timelineItems[lightboxIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
