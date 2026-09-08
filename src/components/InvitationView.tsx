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

const CDN_BASE = "https://cdn.momeninvite.web.id";

function formatCategory(cat?: string | null): string {
  if (!cat) return "Momen";
  return cat
    .split(/([ -])/)
    .map((part) =>
      part.length > 0
        ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        : part
    )
    .join("");
}

interface InvitationViewProps {
  data: InvitationData | null;
}

export function InvitationView({ data }: InvitationViewProps) {
  const greeting = data?.birthdayGreeting;
  const config = data?.order.sectionConfig;
  const galleries = data?.galleries || [];
  const slug = data?.order.slug || "sayang";

  // Ekstrak media: utamakan g.url dari database API, dengan CDN fallback jika API cache sedang transisi
  const heroImage =
    galleries.find((g) => g.slot === "hero_image")?.url ||
    `${CDN_BASE}/events/${slug}/photos/hero-head.jpeg`;

  const polaroidImage =
    galleries.find((g) => g.slot === "letter_polaroid")?.url ||
    `${CDN_BASE}/events/${slug}/photos/letter-surat.jpeg`;

  const finalBackground =
    galleries.find((g) => g.slot === "final_background")?.url ||
    `${CDN_BASE}/events/${slug}/photos/footer-sunset.jpeg`;

  const musicUrl =
    galleries.find((g) => g.slot === "bg_music")?.url ||
    config?.bgMusicUrl ||
    `${CDN_BASE}/events/${slug}/music/monokrom.mp3`;

  // Timeline items murni dari data API
  const timelineItems = greeting?.timelineItems;

  // Gallery items murni dari data_galeries API (14 foto + 1 video)
  const galleryItems: GalleryItem[] | undefined =
    galleries.length > 0
      ? galleries
          .filter((g) => g.slot === "gallery")
          .map((g, idx) => {
            const isVideo = g.type === "video" || idx === 1;
            const defaultFilename = isVideo
              ? "gallery-02.mp4"
              : `gallery-${String(idx + 1).padStart(2, "0")}.jpeg`;
            const defaultFolder = isVideo ? "videos" : "photos";
            return {
              id: String(idx + 1).padStart(2, "0"),
              type: isVideo ? ("video" as const) : ("image" as const),
              src:
                g.url ||
                `${CDN_BASE}/events/${slug}/${defaultFolder}/${defaultFilename}`,
              title: g.caption || `Momen ${idx + 1}`,
              description: g.caption || "",
              category: formatCategory(g.category),
            };
          })
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
