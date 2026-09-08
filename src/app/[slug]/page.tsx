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

  // Jika data event order tidak ditemukan di database dan bukan slug default sayang,
  // otomatis redirect ke default /sayang
  if (!data && decodedSlug.toLowerCase() !== "sayang") {
    redirect("/sayang");
  }

  return <InvitationView data={data} />;
}
