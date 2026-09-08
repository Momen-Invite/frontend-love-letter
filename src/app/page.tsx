import { fetchInvitationData } from "@/lib/api";
import { InvitationView } from "@/components/InvitationView";

export default async function Home(props: {
  searchParams?: Promise<{ slug?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const slug =
    searchParams?.slug ||
    process.env.NEXT_PUBLIC_INVITATION_SLUG ||
    "sayang";

  const data = await fetchInvitationData(slug);

  return <InvitationView data={data} />;
}
