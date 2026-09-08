"use client";

import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote as QuoteIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { quotes as defaultQuotes } from "@/lib/data";
import type { Quote } from "@/types";

export interface QuotesSectionProps {
  quotes?: Quote[];
}

export function QuotesSection({ quotes = defaultQuotes }: QuotesSectionProps = {}) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Gesture drag & touch state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const goToSlide = (index: number) => {
    setActiveIndex((index + quotes.length) % quotes.length);
  };

  const goToNext = () => {
    goToSlide(activeIndex + 1);
  };

  const goToPrev = () => {
    goToSlide(activeIndex - 1);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX =
      touchEndX.current ??
      (e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientX
        : null);

    if (touchStartX.current !== null && endX !== null) {
      const distance = touchStartX.current - endX;
      const isSwipeLeft = distance > 40;
      const isSwipeRight = distance < -40;

      if (isSwipeLeft) {
        goToNext();
      } else if (isSwipeRight) {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchEndX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        goToNext();
      } else if (distance < -40) {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  // Auto-advance carousel (paused when user is interacting)
  useEffect(() => {
    if (isPaused || quotes.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length, isPaused]);

  if (quotes.length === 0) return null;

  return (
    <section
      ref={ref}
      id="quotes"
      className="py-16 md:py-24 bg-pink-light/20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Quote icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-primary/20 to-pink-dark/20 flex items-center justify-center shadow-sm">
              <QuoteIcon className="w-6 h-6 text-pink-primary" />
            </div>
          </div>

          {/* Quote horizontal sliding track */}
          <div className="relative group">
            {/* Left navigation arrow */}
            {quotes.length > 1 && (
              <button
                onClick={goToPrev}
                className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-charcoal/70 hover:text-pink-primary shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
                aria-label="Kutipan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Slider track container */}
            <div
              data-testid="quotes-slider"
              className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-2xl py-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPaused(true)}
            >
              <div
                className="flex transition-transform duration-500 ease-out items-center"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="w-full shrink-0 px-4 sm:px-12 flex items-center justify-center min-h-[130px]"
                  >
                    <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed max-w-2xl mx-auto">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right navigation arrow */}
            {quotes.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-charcoal/70 hover:text-pink-primary shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
                aria-label="Kutipan berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Dot navigation */}
          {quotes.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {quotes.map((quote, index) => (
                <button
                  key={quote.id}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex
                      ? "w-8 h-2.5 bg-gradient-to-r from-pink-primary to-pink-dark shadow-sm shadow-pink-primary/30"
                      : "w-2.5 h-2.5 bg-pink-primary/30 hover:bg-pink-primary/50"
                  }`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
