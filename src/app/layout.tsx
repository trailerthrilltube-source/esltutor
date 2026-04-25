import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "[Tutor Name] | Online ESL Tutoring",
  description:
    "Learn English online with personalized 1-on-1 tutoring. Conversational English, Grammar, Vocabulary, Pronunciation lessons. Book your free 15-minute trial today.",
  keywords: [
    "ESL tutor",
    "online English lessons",
    "learn English",
    "conversational English",
    "English tutor Philippines",
  ],
  openGraph: {
    title: "[Tutor Name] | Online ESL Tutoring",
    description:
      "Learn English online with personalized 1-on-1 tutoring. Conversational English, Grammar, Vocabulary, Pronunciation lessons.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
