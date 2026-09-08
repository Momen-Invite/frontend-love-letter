import { fetchInvitationData } from "@/lib/api";
import { InvitationView } from "@/components/InvitationView";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await fetchInvitationData(decodedSlug);

  const name =
    data?.birthdayGreeting?.celebrantName ||
    data?.order?.sectionConfig?.heroCelebrantText ||
    "Sayang";

  const description =
    data?.birthdayGreeting?.heroDescription ||
    `Sebuah kejutan dan ucapan selamat ulang tahun online romantis untuk ${name} yang dirancang penuh cinta.`;

  const heroImage =
    data?.galleries?.find((g) => g.slot === "hero_image")?.url ||
    "https://cdn.momeninvite.web.id/events/sayang/photos/hero-head.jpeg";

  const pageUrl = `https://momeninvite.web.id/love-letter/${decodedSlug}`;

  return {
    title: `Happy Birthday ${name} 🌸 | Love Letter`,
    description,
    keywords: [
      "undangan ulang tahun online",
      "ucapan ulang tahun romantis",
      "love letter birthday",
      "momen invite",
      name,
    ],
    authors: [{ name: "Momen Invite", url: "https://momeninvite.web.id" }],
    creator: "Momen Invite",
    publisher: "Momen Invite",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: pageUrl,
      title: `Happy Birthday ${name} 🌸 | Love Letter - Momen Invite`,
      description,
      siteName: "Momen Invite",
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `Happy Birthday ${name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Happy Birthday ${name} 🌸 | Love Letter - Momen Invite`,
      description,
      images: [heroImage],
      creator: "@momeninvite",
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default async function DynamicInvitationPage({
  params,
}: DynamicPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await fetchInvitationData(decodedSlug);

  // Jika data event order tidak ditemukan di database dan bukan slug default sayang,
  // otomatis redirect ke default /sayang
  if (!data && decodedSlug.toLowerCase() !== "sayang") {
    redirect("/sayang");
  }

  const name =
    data?.birthdayGreeting?.celebrantName ||
    data?.order?.sectionConfig?.heroCelebrantText ||
    "Sayang";

  const description =
    data?.birthdayGreeting?.heroDescription ||
    `Sebuah kejutan dan ucapan selamat ulang tahun online romantis untuk ${name} yang dirancang penuh cinta.`;

  const heroImage =
    data?.galleries?.find((g) => g.slot === "hero_image")?.url ||
    "https://cdn.momeninvite.web.id/events/sayang/photos/hero-head.jpeg";

  const pageUrl = `https://momeninvite.web.id/love-letter/${decodedSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://momeninvite.web.id/#website",
        name: "Momen Invite",
        url: "https://momeninvite.web.id",
        inLanguage: "id-ID",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: "https://momeninvite.web.id",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tema Love Letter",
            item: "https://momeninvite.web.id/love-letter",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Event",
        "@id": `${pageUrl}#event`,
        name: `Perayaan Ulang Tahun ${name}`,
        description,
        startDate:
          data?.order?.eventDate || new Date().toISOString().split("T")[0],
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        image: [heroImage],
        organizer: {
          "@type": "Organization",
          name: "Momen Invite",
          url: "https://momeninvite.web.id",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InvitationView data={data} />
    </>
  );
}
