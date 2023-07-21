"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { useSettings } from "@/providers/settings";
import { useRouter } from "next/navigation";

export default function Setup() {
  const [homeAssistantUrl, setHomeAssistantUrl] = useState<string>("");
  const { settings, updateSettings } = useSettings();
  const router = useRouter();

  useEffect(() => {
    setHomeAssistantUrl(settings?.homeAssistant?.url || "");
  }, [settings?.homeAssistant?.url]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setHomeAssistantUrl(event.target.value);
  }

  function handleSetup(): void {
    if (!settings) return;
    console.log("Current settings:", settings);
    settings.homeAssistant.url = homeAssistantUrl;
    updateSettings(settings);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">
        Please enter Home Assistant URL
      </h2>
      <form className="flex w-full flex-col gap-4">
        <input
          className="mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
          type="text"
          autoFocus
          name="homeAssistant.url"
          aria-label="Home Assistant URL"
          onChange={handleChange}
          value={homeAssistantUrl}
        />
      </form>
      <button
        className="mt-2 rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        onClick={() => handleSetup()}
      >
        Save and Login
      </button>
    </>
  );
}
