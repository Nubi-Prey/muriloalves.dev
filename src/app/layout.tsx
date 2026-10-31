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
  title: {
    default:
      "Murilo Alves // Desenvolvedor de Software & Sistemas | Software & Systems Developer",
    template: "%s | Murilo Alves",
  },
  description:
    "Portfólio de Murilo Alves: desenvolvimento de sistemas baremetal, arquitetura de backend resiliente, bancos de dados e ferramentas desktop local-first. // Portfolio: baremetal systems development, resilient backend architecture, databases, and local-first commercial desktop tools.",
  keywords: [
    "Murilo Alves",
    "Nubi-Prey",
    "Desenvolvedor de Software",
    "Desenvolvedor de Sistemas",
    "Software Developer",
    "Systems Developer",
    "Backend Architecture",
    "Databases",
    "PostgreSQL",
    "SQLite",
    "Local-First Desktop",
    "Baremetal Linux",
    "Rust",
    "C",
    "C++",
    "Python",
    "TypeScript",
    "Java",
  ],
  authors: [{ name: "Murilo Alves", url: "https://muriloalves.dev" }],
  creator: "Murilo Alves",
  publisher: "Murilo Alves",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Murilo Alves // Desenvolvedor de Software & Sistemas",
    description:
      "Portfólio de Murilo Alves: desenvolvimento de sistemas baremetal, arquitetura de backend resiliente, bancos de dados e ferramentas desktop local-first.",
    url: "https://muriloalves.dev",
    siteName: "muriloalves.dev",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murilo Alves // Software & Systems Developer",
    description:
      "Portfolio: baremetal systems development, resilient backend architecture, databases, and local-first commercial desktop tools.",
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
