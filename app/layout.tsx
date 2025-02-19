import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "AI Glossary - Product Terms Explained Simply",
  description: "Your guide to product and tech terminology, explained in plain English with real-life analogies. Perfect for product managers and tech professionals.",
  keywords: "AI glossary, product terms, tech terminology, software definitions, product management glossary",
  openGraph: {
    title: "AI Glossary - Product Terms Explained Simply",
    description: "Tech & product terms explained in plain English with real-life analogies",
    url: "https://ai-glossary.vercel.app",
    siteName: "AI Glossary",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Glossary - Product Terms Explained Simply",
    description: "Tech & product terms explained in plain English with real-life analogies",
    creator: "@omega_eps",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header className="flex justify-between items-center p-3 xs:p-4 border-b bg-white shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/robot.svg" alt="Logo" className="h-8 w-8 xs:h-12 xs:w-12" />
            <span className="font-bold text-base xs:text-lg text-gray-900 hover:text-indigo-900">AI Glossary</span>
          </Link>

          {/* Navigation Link */}
          <nav>
            <Link href="/glossary" className="text-sm font-medium text-gray-900 hover:text-indigo-900 transition-colors">
              Glossary
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="flex flex-col items-center p-4 border-t">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 mb-2">
              <img src="/robot.svg" alt="Logo" className="h-12 w-12" />
              <span className="font-medium text-gray-700">AI Glossary</span>
            </div>
          </Link>

        </footer>
      </body>
    </html>
  );
}
