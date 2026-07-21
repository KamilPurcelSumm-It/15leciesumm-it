import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "15-lecie summ-it",
  icons: {
    icon: [{ url: "/logo_summit.png", type: "image/png" }],
    shortcut: "/logo_summit.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
