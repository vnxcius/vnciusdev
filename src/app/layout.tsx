import type { Metadata } from "next";
import "./globals.css";

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
    <html className="min-h-screen" lang="en" suppressHydrationWarning>
      {children}
    </html>
  );
}
