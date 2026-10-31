import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muriloalves.dev"),
  title: "Murilo Alves // Software & Systems Engineer",
  description:
    "Engineering portfolio: baremetal operating systems, resilient backend architecture, databases, and local-first commercial desktop tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Murilo Alves // Software & Systems Engineer",
    description:
      "Engineering portfolio: baremetal operating systems, resilient backend architecture, databases, and local-first commercial desktop tools.",
    url: "https://muriloalves.dev",
    siteName: "muriloalves.dev",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murilo Alves // Software & Systems Engineer",
    description:
      "Engineering portfolio: baremetal operating systems, resilient backend architecture, databases, and local-first commercial desktop tools.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen w-full flex flex-col selection:bg-[#b83a20] selection:text-[#ede5d8]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
