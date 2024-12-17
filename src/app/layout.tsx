import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SpinnerWrapper from "./components/SpinnerWrapper";

// Import custom fonts with proper variable names
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the browser tab
export const metadata: Metadata = {
  title: "Card Counting Trainer",
  description: "Level up your card counting skills with an interactive trainer!",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon: Replace '/cards/favicon.png' with your custom card-related favicon */}
        <link rel="icon" href="/cards/favicon.png" type="image/png" />
      </head>
      <body
        className={`bg-gray-100 antialiased ${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true}
      >
        {/* Global spinner wrapper for loading state */}
        <SpinnerWrapper>
          {children}
        </SpinnerWrapper>
      </body>
    </html>
  );
}
