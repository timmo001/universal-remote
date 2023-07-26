import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { HomeAssistantProvider } from "@/providers/homeAssistant";
import { SettingsProvider } from "@/providers/settings";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Universal Remote",
  description: "Control your home using Home Assistant and Next.js",
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
