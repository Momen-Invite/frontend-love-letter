"use client";

import Image from "next/image";
import { useConfetti } from "@/hooks/useConfetti";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useAudio } from "@/hooks/useAudio";
import { Heart, PartyPopper, Mail } from "lucide-react";

export interface HeroSectionProps {
  badge?: string;
  heading1?: string;
  heading2?: string;
  celebrantName?: string;
  description?: string;
  heroImage?: string;
  musicUrl?: string;
}

export function HeroSection({
  badge = "Happy Birthday",
  heading1 = "Selamat",
  heading2 = "Ulang Tahun",
  celebrantName = "Sayang",
  description = "Di hari yang paling spesial ini, aku ingin kamu tahu betapa berarti dan berharganya kamu dalam hidupku. Kamu adalah hadiah terindahku.",
  heroImage,
  musicUrl,
}: HeroSectionProps = {}) {
  const fireConfetti = useConfetti();
  const { play: playMusic } = useAudio(musicUrl);
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  const handleCelebrate = () => {
    fireConfetti();
    playMusic();
  };

  const handleScrollToLetter = () => {
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating gold dots */}
        <div
          className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-gold/40 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-[20%] w-1.5 h-1.5 rounded-full bg-gold/30 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-32 right-[15%] w-2 h-2 rounded-full bg-gold/20 animate-float"
          style={{ animationDelay: "4s" }}
        />
        {/* Floating pink dots */}
        <div
          className="absolute top-32 right-[30%] w-3 h-3 rounded-full bg-pink-primary/20 animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-[25%] w-2 h-2 rounded-full bg-pink-light/30 animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column - Text content */}
          <div
            className={`order-2 md:order-1 text-center md:text-left transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Label */}
            <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                {badge}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-2">
              <span className="italic text-charcoal">{heading1}</span>
              <br />
              <span className="italic text-charcoal">{heading2}</span>
            </h1>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic font-bold bg-gradient-to-r from-pink-primary to-pink-dark bg-clip-text text-transparent mb-6">
              {celebrantName}
            </p>

            {/* Description */}
            <p className="text-brown-light text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleCelebrate}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-primary to-pink-dark text-white font-semibold text-sm shadow-lg shadow-pink-primary/25 hover:shadow-xl hover:shadow-pink-primary/30 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4" />
                Rayakan!
              </button>
              <button
                onClick={handleScrollToLetter}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-charcoal/20 text-charcoal font-semibold text-sm hover:bg-charcoal/5 hover:border-charcoal/30 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Baca Suratku
              </button>
            </div>
          </div>

          {/* Right column - Image */}
          <div
            className={`order-1 md:order-2 flex justify-center transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Oval frame with pink border */}
              <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]">
                <div className="absolute inset-0 rounded-[50%] bg-gradient-to-br from-pink-light/50 to-pink-primary/20 p-1">
                  <div className="relative w-full h-full rounded-[50%] overflow-hidden border-4 border-white/60 shadow-2xl">
                    {heroImage ? (
                      <Image
                        src={heroImage}
                        alt={celebrantName}
                        fill
                        sizes="(max-width: 768px) 256px, 384px"
                        className="object-cover"
                        priority
                      />
                    ) : null}
                  </div>
                </div>

                {/* Floating heart badge */}
                <div className="absolute -top-2 right-4 md:right-0 w-12 h-12 md:w-14 md:h-14 bg-pink-primary rounded-full flex items-center justify-center shadow-lg animate-pulse-heart z-10">
                  <Heart className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
                </div>

                {/* Shadow/glow effect */}
                <div className="absolute inset-0 rounded-[50%] bg-pink-primary/10 blur-3xl -z-10 scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
