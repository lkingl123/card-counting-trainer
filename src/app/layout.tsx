import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SpinnerWrapper from "./components/SpinnerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Suppress hydration warning to ignore external class mismatches */}
      <body className="bg-gray-100 antialiased" suppressHydrationWarning={true}>
        <SpinnerWrapper>
          {children}
        </SpinnerWrapper>
      </body>
    </html>
  );
}