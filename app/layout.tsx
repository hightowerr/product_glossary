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
  description: "Your go-to resource for understanding product and tech terminology, explained in plain English with real-life analogies. Perfect for product managers, developers, and tech enthusiasts.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/robot.svg" alt="Logo" className="h-12 w-12" />
            <span className="font-bold text-lg">AI Glossary</span>
          </Link>

          {/* Navigation Link */}
          <nav>
            <Link href="/glossary" className="text-sm font-medium text-gray-700 hover:text-gray-900">
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

          {/* Social Media */}
          <div className="flex space-x-4 mb-2">
            <a
              href="https://x.com/omega_eps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.864 9.864 0 01-3.127 1.196 4.916 4.916 0 00-8.379 4.482A13.944 13.944 0 011.671 3.149 4.92 4.92 0 003.195 9.723a4.903 4.903 0 01-2.228-.616v.062a4.917 4.917 0 003.946 4.827 4.901 4.901 0 01-2.224.084 4.918 4.918 0 004.59 3.417A9.874 9.874 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
