import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn javascript",
  description: "Learn javascript in your language.",
  manifest: "/manifest.json",
  keywords: ["javascript", "webdevelopment"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://play-with-javascript.vercel.app",
    title: "Learn javascript",
    description: "learn javascript in your native language.",
    images: [
      {
        url: "https://play-with-javascript.vercel.app/og.png",
        alt: "Play with javascript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn javascript",
    description: "learn javascript in your native language",
    images: ["https://play-with-javascript.vercel.app/og.png"],
    creator: "divyam gupta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>{children}</body>
    </html>
  );
}
