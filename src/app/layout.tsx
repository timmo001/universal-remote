"use client";
import type { Metadata } from "next";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

import "@/app/globals.css";
import { HomeAssistantProvider } from "@/providers/homeAssistant";
import { SettingsProvider } from "@/providers/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Remote",
  description: "Control your home using Home Assistant and Next.js",
};

const pageMap: { [path: string]: string } = {
  "/": "Home",
  "/lights": "Lights",
  "/music": "Music",
  "/settings": "Settings",
  "/setup": "Setup",
  "/tv": "TV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <HomeAssistantProvider>
            <div className="mx-auto flex min-h-screen max-w-xs flex-col items-baseline justify-start gap-1 px-4 py-4">
              <header className="align-center flex w-full flex-row justify-start gap-2">
                {pathname !== "/" && (
                  <button
                    className="rounded-md border border-transparent text-sm font-medium text-white shadow-sm focus:outline-none"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-400" />
                  </button>
                )}
                <h2 className="text-2xl font-bold">{pageMap[pathname]}</h2>
              </header>
              <main className="mx-2 my-4 flex min-h-screen w-full max-w-xs flex-col items-baseline justify-start gap-2">
                {children}
              </main>
            </div>
          </HomeAssistantProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
