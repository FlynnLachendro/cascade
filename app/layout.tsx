import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileBlock } from "@/components/mobile/MobileBlock";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Cascade — GxP Change Impact Analyzer",
  description:
    "See how one change ripples through your entire regulated workflow. Model GxP manufacturing dependencies and simulate change impacts with AI-powered regulatory analysis.",
  openGraph: {
    title: "Cascade — GxP Change Impact Analyzer",
    description:
      "See how one change ripples through your entire regulated workflow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MobileBlock />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
