import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Portfolio | Full-Stack Developer",
  description: "Interactive portfolio — explore the skills inside my brain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}