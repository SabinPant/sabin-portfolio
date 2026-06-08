import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabin Pant — Software Developer",
  description: "Full-Stack & Backend Developer. System Design First.",
  icons: {
    icon: "data:,",
  },
  openGraph: {
    title: "Sabin Pant — Software Developer",
    description: "Full-Stack & Backend Developer. System Design First.",
    url: "https://sabin-portfolio-hazel.vercel.app/",
    siteName: "Sabin Pant Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
