"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Heart,
  Star,
  Gem,
  Crown,
  Compass,
  Wind,
  Sparkles,
} from "lucide-react";
import { wishCards as defaultWishCards } from "@/lib/data";
import type { WishCard as WishCardType } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  star: Star,
  gem: Gem,
  crown: Crown,
  compass: Compass,
  wind: Wind,
};

function WishCard({
  card,
  index,
}: {
  card: WishCardType;
  index: number;
}) {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>(0.2);
  const IconComponent = iconMap[card.icon] ?? Heart;

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gold/10 hover:border-pink-primary hover:shadow-lg hover:shadow-pink-primary/10 hover:-translate-y-1 transition-all duration-300 h-full">
        {/* Number badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-primary/10 to-pink-dark/10 flex items-center justify-center group-hover:from-pink-primary group-hover:to-pink-dark transition-all duration-300">
            <IconComponent className="w-5 h-5 text-pink-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="text-xs text-gold/50 group-hover:text-gold group-hover:font-bold transition-all duration-300">{card.id}</span>
        </div>

        <h3 className="font-serif italic text-lg text-charcoal mb-2">
          {card.title}
        </h3>
        <p className="text-brown-light text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export interface WishesSectionProps {
  cards?: WishCardType[];
}

export function WishesSection({ cards = defaultWishCards }: WishesSectionProps = {}) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);

  return (
    <section ref={ref} id="wishes" className="py-16 md:py-24 bg-pink-light/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">
              Seribu Harapan Untukmu
            </span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-charcoal mb-3">
            Seribu Harapan Untukmu
          </h2>
          <p className="text-brown-light text-sm max-w-md mx-auto">
            Doa-doa terbaik yang kupanjatkan di setiap hembusan napas untuk
            kebahagiaanmu.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => (
            <WishCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
