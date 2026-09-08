import type { Metadata } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://momeninvite.web.id/love-letter"),
  title: {
    default: "Happy Birthday Sayang 🌸 | Love Letter - Momen Invite",
    template: "%s | Momen Invite",
  },
  description:
    "Undangan & kejutan ucapan ulang tahun online romantis penuh cinta dari Momen Invite.",
  keywords: [
    "undangan ulang tahun online",
    "ucapan ulang tahun romantis",
    "love letter birthday",
    "momen invite",
  ],
  authors: [{ name: "Momen Invite", url: "https://momeninvite.web.id" }],
  creator: "Momen Invite",
  publisher: "Momen Invite",
  icons: {
    icon: "/love-letter/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${quicksand.variable} antialiased`}
    >
      <body className="min-h-full bg-[#faf6f1] text-[#2d1f14] selection:bg-pink-200">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
