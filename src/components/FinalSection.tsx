"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useConfetti } from "@/hooks/useConfetti";
import { useAudio } from "@/hooks/useAudio";
import { Heart, PartyPopper, Star, Gift, Sparkles, Cake } from "lucide-react";

export function FinalSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.3);
  const fireConfetti = useConfetti();
  const { play: playMusic } = useAudio("/audios/monokrom.mp3");

  const handleCelebrate = () => {
    fireConfetti();
    playMusic();
  };

  return (
    <section ref={ref} id="final" className="relative py-24 md:py-32">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer.jpeg"
          alt="Sunset background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Pulsing heart */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-pink-primary/30 flex items-center justify-center animate-pulse-heart backdrop-blur-sm">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Selamat Ulang Tahun, Sayang!
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-3 max-w-lg mx-auto">
            Semoga hari ulang tahunmu ini menjadi awal dari bab paling bahagia
            dalam hidupmu.
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Aku mencintaimu kemarin, hari ini, dan selamanya.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleCelebrate}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-pink-primary to-pink-dark text-white font-semibold text-base shadow-lg shadow-pink-primary/30 hover:shadow-xl hover:shadow-pink-primary/40 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <PartyPopper className="w-5 h-5" />
            Rayakan!
          </button>

          {/* Decorative falling icons */}
          <div className="flex justify-center gap-4 mt-8">
            <Star 
              className="w-6 h-6 text-gold fill-gold animate-float opacity-80"
              style={{ animationDelay: "0s", animationDuration: "4s" }}
            />
            <Gift 
              className="w-5 h-5 text-pink-light fill-pink-light animate-float opacity-70"
              style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
            />
            <Heart 
              className="w-7 h-7 text-white fill-white animate-float opacity-90"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            />
            <Sparkles 
              className="w-5 h-5 text-pink-primary fill-pink-primary animate-float opacity-70"
              style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
            />
            <Cake 
              className="w-6 h-6 text-gold fill-gold animate-float opacity-80"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            />
          </div>

          {/* Footer credit */}
          <p className="mt-16 text-white/50 text-sm">
            Dibuat dengan{" "}
            <Heart className="w-3.5 h-3.5 text-pink-primary fill-pink-primary inline-block mx-0.5" />{" "}
            oleh Aku
          </p>
        </div>
      </div>
    </section>
  );
}
