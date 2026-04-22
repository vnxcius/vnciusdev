import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/cn";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vinícius Hilton",
  description: "Vinícius Simon G. Hilton's personal website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn("min-h-screen", "font-mono", jetbrainsMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}
