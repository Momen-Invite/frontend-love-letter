"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LetterSection } from "@/components/LetterSection";
import { TimelineSection } from "@/components/TimelineSection";
import { WishesSection } from "@/components/WishesSection";
import { GallerySection } from "@/components/GallerySection";
import { QuotesSection } from "@/components/QuotesSection";
import { FinalSection } from "@/components/FinalSection";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import type { InvitationData } from "@/lib/api";
import type { GalleryItem } from "@/types/gallery";

interface InvitationViewProps {
  data: InvitationData | null;
}

export function InvitationView({ data }: InvitationViewProps) {
  const greeting = data?.birthdayGreeting;
  const config = data?.order.sectionConfig;
  const galleries = data?.galleries || [];

  // Ekstrak media murni dari data API (database & S3/R2 CDN)
  const heroImage = galleries.find((g) => g.slot === "hero_image")?.url;
  const polaroidImage = galleries.find((g) => g.slot === "letter_polaroid")?.url;
  const finalBackground = galleries.find((g) => g.slot === "final_background")?.url;
  const musicUrl = galleries.find((g) => g.slot === "bg_music")?.url || config?.bgMusicUrl;

  // Timeline items murni dari data API
  const timelineItems = greeting?.timelineItems;

  // Gallery items murni dari data_galeries API
  const galleryItems: GalleryItem[] | undefined =
    galleries.length > 0
      ? galleries
          .filter((g) => g.slot === "gallery")
          .map((g, idx) => ({
            id: String(idx + 1).padStart(2, "0"),
            type: g.type === "video" ? "video" : "image",
            src: g.url,
            title: g.caption || `Momen ${idx + 1}`,
            description: g.caption || "",
            category: g.category || "Momen",
          }))
      : undefined;

  const celebrantName =
    greeting?.celebrantName || config?.heroCelebrantText || "Sayang";

  return (
    <>
      <Header title={`Happy Birthday ${celebrantName}`} />
      <main className="pt-16">
        <HeroSection
          badge={config?.heroBadge}
          heading1={config?.heroHeading1}
          heading2={config?.heroHeading2}
          celebrantName={celebrantName}
          description={greeting?.heroDescription}
          heroImage={heroImage}
          musicUrl={musicUrl}
        />
        <LetterSection
          polaroidImage={polaroidImage}
          letterTitle={greeting?.letterTitle}
          salutation={greeting?.letterSalutation}
          paragraphs={greeting?.letterParagraphs}
          senderName={greeting?.letterSenderName}
        />
        <TimelineSection items={timelineItems} />
        <WishesSection cards={greeting?.wishCards} />
        <GallerySection items={galleryItems} />
        <QuotesSection quotes={greeting?.quotesItems} />
        <FinalSection
          backgroundImage={finalBackground}
          heading={config?.finalHeading}
          subtitle1={config?.finalSubtitle1}
          subtitle2={config?.finalSubtitle2}
          musicUrl={musicUrl}
          footerCredit={config?.footerCredit}
        />
      </main>
      <ScrollToTopButton />
    </>
  );
}
