import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster as Sonner } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spenza Motors - We Deliver You Drive",
  description: "Experience premium automotive excellence combined with exceptional dining at Spenza Motors. Luxury car dealership and fine dining in one location.",
  keywords: ["Spenza Motors", "car dealership", "luxury vehicles", "fine dining", "restaurant", "automotive", "premium cars"],
  authors: [{ name: "Spenza Motors" }],
  openGraph: {
    title: "Spenza Motors - We Deliver You Drive",
    description: "Premium automotive excellence meets fine dining experience",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spenza Motors - We Deliver You Drive",
    description: "Premium automotive excellence meets fine dining experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
