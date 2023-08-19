import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { HomeAssistantProvider } from "@/providers/homeAssistant";
import { SettingsProvider } from "@/providers/settings";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Remote",
  description: "A remote control for your home",
  applicationName: "Universal Remote",
  authors: {
    name: "Aidan Timson <Timmo>",
    url: "https://github.com/timmo001/universal-remote",
  },
  keywords: [
    "Control",
    "Home Assistant",
    "Next.js",
    "React",
    "TypeScript",
    "Universal Remote",
  ],
  themeColor: {
    color: "#673AB7",
    media: "(prefers-color-scheme: dark)",
  },
  colorScheme: "dark",
  creator: "Aidan Timson <Timmo>",
  publisher: "Aidan Timson <Timmo>",
  icons: [
    {
      sizes: "192x192",
      type: "image/png",
      url: "/android-chrome-192x192.png",
    },
    {
      sizes: "512x512",
      type: "image/png",
      url: "/android-chrome-512x512.png",
    },
  ],
  manifest: "/manifest.json",
  category: "Home Automation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <HomeAssistantProvider>
            <div
              className="mx-auto flex min-h-screen max-w-md flex-col items-baseline justify-start gap-1 px-4 py-4"
              id="container"
            >
              <Header />
              <main className="mx-2 my-4 flex min-h-screen w-full flex-col items-baseline justify-start gap-2">
                {children}
              </main>
            </div>
          </HomeAssistantProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
