import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LetterSection } from "@/components/LetterSection";
import { TimelineSection } from "@/components/TimelineSection";
import { WishesSection } from "@/components/WishesSection";
import { GallerySection } from "@/components/GallerySection";
import { QuotesSection } from "@/components/QuotesSection";
import { FinalSection } from "@/components/FinalSection";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <LetterSection />
        <TimelineSection />
        <WishesSection />
        <GallerySection />
        <QuotesSection />
        <FinalSection />
      </main>
      <ScrollToTopButton />
    </>
  );
}
