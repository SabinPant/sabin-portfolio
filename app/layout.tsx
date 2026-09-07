import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Sabin Pant is a full-stack and backend developer focused on system design, Java, .NET, Node.js, and scalable API architecture.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sabinpant.com.np"),
  title: "Sabin Pant · Software Developer",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Sabin Pant · Software Developer",
    description: SITE_DESCRIPTION,
    url: "https://sabinpant.com.np/",
    siteName: "Sabin Pant",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1014" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabin Pant",
  url: "https://sabinpant.com.np",
  jobTitle: "Full-Stack and Backend Developer",
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/SabinPant", "https://linkedin.com/in/sabinpant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
