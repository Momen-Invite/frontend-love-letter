import type { TimelineItem, WishCard, Quote } from "@/types";

export interface InvitationData {
  order: {
    id: number;
    slug: string;
    eventDate: string | null;
    status: string;
    isPublished: boolean;
    sectionConfig?: {
      bgMusicUrl?: string;
      heroBadge?: string;
      heroHeading1?: string;
      heroHeading2?: string;
      heroCelebrantText?: string;
      finalHeading?: string;
      finalSubtitle1?: string;
      finalSubtitle2?: string;
      footerCredit?: string;
    };
  };
  birthdayGreeting: {
    celebrantName: string;
    celebrantAge: number;
    heroDescription: string;
    letterTitle: string;
    letterSalutation: string;
    letterSenderName: string;
    letterParagraphs: string[];
    timelineItems: TimelineItem[];
    wishCards: WishCard[];
    quotesItems: Quote[];
  };
  galleries: Array<{
    id: number;
    type: "image" | "video" | "audio";
    slot: string;
    category?: string;
    caption?: string;
    url: string;
    sortOrder: number;
  }>;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.momeninvite.web.id";

export async function fetchInvitationData(
  slug: string = "sayang"
): Promise<InvitationData | null> {
  try {
    const cleanSlug = encodeURIComponent(slug.trim());
    const res = await fetch(
      `${API_BASE_URL}/api/public/invitations/${cleanSlug}`,
      {
        cache: "no-store", // Selalu fetch data terbaru saat testing
      }
    );

    if (!res.ok) {
      console.warn(
        `[API] Gagal fetch data dari ${API_BASE_URL} (Status: ${res.status}). Menggunakan fallback.`
      );
      return null;
    }

    const json = await res.json();
    if (!json.success || !json.data) {
      return null;
    }

    return json.data as InvitationData;
  } catch (err) {
    console.error("[API] Error fetching invitation data:", err);
    return null;
  }
}
