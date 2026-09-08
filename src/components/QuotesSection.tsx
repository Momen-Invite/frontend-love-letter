"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote as QuoteIcon } from "lucide-react";
import { quotes as defaultQuotes } from "@/lib/data";
import type { Quote } from "@/types";

export interface QuotesSectionProps {
  quotes?: Quote[];
}

export function QuotesSection({ quotes = defaultQuotes }: QuotesSectionProps = {}) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section
      ref={ref}
      id="quotes"
      className="py-16 md:py-24 bg-pink-light/20"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Quote icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-primary/20 to-pink-dark/20 flex items-center justify-center">
              <QuoteIcon className="w-6 h-6 text-pink-primary" />
            </div>
          </div>

          {/* Quote carousel */}
          <div className="relative min-h-[120px] flex items-center justify-center">
            {quotes.map((quote, index) => (
              <p
                key={quote.id}
                className={`absolute inset-x-0 font-serif italic text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed transition-all duration-700 px-4 ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {quotes.map((quote, index) => (
              <button
                key={quote.id}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex
                    ? "w-8 h-2.5 bg-gradient-to-r from-pink-primary to-pink-dark"
                    : "w-2.5 h-2.5 bg-pink-primary/30 hover:bg-pink-primary/50"
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
