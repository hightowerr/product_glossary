import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-glossary.vercel.app'),
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
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />  
        <meta name="author" content="Jam11" />
        <meta name="keywords" content="AI glossary, product terms, tech terminology, software definitions, product management glossary" />
        <meta name="description" content="Your guide to Artificial Intelligence (AI) terminology, explained in plain English with real-life analogies. Perfect for product managers and tech professionals." />
        <meta name="author" content="Yink" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <title>AI Glossary - AI Terms Explained Simply</title>
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                <Image 
                  src="/robot.svg" 
                  alt="Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 sm:w-9 sm:h-9"
                />
                <span className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">
                  AI Glossary
                </span>
              </Link>

              {/* Navigation */}
              <nav className="flex items-center space-x-4 md:space-x-6">
                <Link 
                  href="/glossary" 
                  className="text-sm md:text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Glossary
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <div className="flex flex-col items-center">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                <Image 
                  src="/robot.svg" 
                  alt="Logo" 
                  width={36} 
                  height={36} 
                  className="w-8 h-8 sm:w-9 sm:h-9"
                />
                <span className="font-medium text-gray-900">
                  AI Glossary
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Your guide to AI terminology, explained simply
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
