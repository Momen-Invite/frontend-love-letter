import { fetchInvitationData } from "@/lib/api";
import { InvitationView } from "@/components/InvitationView";
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

  return {
    title: `Happy Birthday ${name} 🌸`,
    description: `A beautiful birthday surprise for ${name} made with love.`,
  };
}

export default async function DynamicInvitationPage({
  params,
}: DynamicPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await fetchInvitationData(decodedSlug);

  return <InvitationView data={data} />;
}
