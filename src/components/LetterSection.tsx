"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Sparkles } from "lucide-react";

export function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="letter"
      className="relative py-12 md:py-16 bg-pink-light/20 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-[10%] w-3 h-3 bg-pink-primary/20 rotate-45 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-32 right-[8%] w-2.5 h-2.5 rounded-full bg-gold/25 animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-24 left-[5%] w-2 h-2 bg-pink-light/40 rotate-12 animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-20 right-[25%] text-pink-primary/15 text-xl animate-float-slow" style={{ animationDelay: "1s" }}>✦</div>
        <div className="absolute bottom-32 right-[10%] w-3 h-3 rounded-full bg-pink-primary/15 animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-16 left-[20%] text-gold/20 text-lg animate-float" style={{ animationDelay: "2.5s" }}>★</div>
        <div className="absolute top-48 left-[3%] w-1.5 h-1.5 rounded-full bg-pink-dark/20 animate-float-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-48 right-[20%] w-2 h-2 bg-gold/15 rotate-45 animate-float-slow" style={{ animationDelay: "3.5s" }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">
              Ditulis Dengan Hati
            </span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <p className="text-brown-light text-sm">
            Sebuah pesan rahasia untukmu
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-charcoal mt-4 mb-2">
            Sepucuk Surat Cinta
          </h2>
          <p className="text-brown-light text-xs">
            Aku menulis ini dari hati yang paling dalam untukmu...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left - Polaroid image */}
          <div
            className={`flex justify-center transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white p-3 pb-12 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/surat.jpeg"
                  alt="Ditulis Dengan Hati"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif italic text-charcoal text-lg">
                  Ditulis Dengan Hati
                </p>
                <p className="text-brown-light text-xs mt-1">
                  Sebuah pesan rahasia untukmu
                </p>
              </div>
            </div>
          </div>

          {/* Right - Envelope / Letter */}
          <div
            className={`flex justify-center items-center transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {!isOpen ? (
              /* Envelope (sealed) */
              <div className="relative w-full max-w-sm">
                <div className="bg-gradient-to-b from-cream to-cream-dark rounded-xl border border-gold/20 shadow-xl overflow-hidden">
                  {/* Envelope flap */}
                  <div className="relative h-32 bg-gradient-to-b from-gold/10 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0">
                      <svg
                        viewBox="0 0 400 80"
                        className="w-full text-cream-dark/50"
                      >
                        <path
                          d="M0 80 L200 20 L400 80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Envelope body */}
                  <div className="px-6 py-8 text-center">
                    <p className="font-serif italic text-charcoal text-lg mb-1">
                      ✦ Surat Cinta Tersegel ✦
                    </p>
                    <p className="text-brown-light text-xs mb-6">
                      Sebuah pesan yang ditulis dengan seluruh hati...
                    </p>

                    {/* Wax seal button */}
                    <button
                      onClick={() => setIsOpen(true)}
                      className="group relative inline-flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-primary to-pink-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                        <Heart className="w-7 h-7 text-white fill-white" />
                      </div>
                      <span className="text-xs text-pink-dark font-medium group-hover:text-pink-primary transition-colors">
                        Klik untuk membuka segel
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Letter (opened) */
              <div className="w-full max-w-sm animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gold/10">
                  {/* Letter header with pink accent */}
                  <div className="h-2 bg-gradient-to-r from-pink-primary to-pink-dark" />

                  {/* Lined paper content */}
                  <div className="p-6 md:p-8 lined-paper">
                    <h3 className="font-serif italic text-xl text-charcoal mb-4 text-center">
                      Teruntuk Sayang Tersayang
                    </h3>

                    <div className="space-y-4 text-sm text-brown-light leading-relaxed">
                      <p>
                        Selamat Happy Birthday my dear 🥳🎂,
                      </p>
                      <p>
                        Semoga dengan bertambahnya umur kamu yang sekarang sudah
                        menginjak angka 20, aku harap kebahagiaan akan selalu
                        menyertai kamu dan cita-cita yang kamu inginkan bisa cepat
                        terwujud. ❤️
                      </p>
                      <p>
                        Apa pun yang diinginkan sekarang semoga bisa segera
                        tercapai. Jadi orang yang lebih baik lagi ke depannya,
                        sukses di masa depan, sukses di dunia maupun akhirat,
                        serta selalu menjadi pribadi yang baik hati dan bijaksana.
                        🎇🎇
                      </p>
                      <p>
                        Aku selalu berdoa untuk kamu, apa pun itu. Aku akan selalu
                        mendukung setiap keputusan dan keinginanmu. Selamat ya
                        sayang, aku sayang kamu. Have fun untuk segalanya!
                        🎇🎉🎊🎂
                      </p>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-xs tracking-widest text-gold uppercase font-semibold mb-2">
                        Dengan Seluruh Cintaku,
                      </p>
                      <p className="font-serif italic text-2xl text-pink-primary">
                        Aku
                      </p>
                      <div className="flex justify-center gap-1 mt-2">
                        <Heart className="w-3 h-3 text-pink-primary fill-pink-primary animate-pulse-heart" />
                        <Heart
                          className="w-3 h-3 text-pink-primary fill-pink-primary animate-pulse-heart"
                          style={{ animationDelay: "0.3s" }}
                        />
                        <Heart
                          className="w-3 h-3 text-pink-primary fill-pink-primary animate-pulse-heart"
                          style={{ animationDelay: "0.6s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
