import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Remote",
  description: "Control your home using Home Assistant and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto flex min-h-screen max-w-xs flex-col items-baseline justify-start gap-2 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
