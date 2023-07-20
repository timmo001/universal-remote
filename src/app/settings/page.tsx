"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";

import type { Settings } from "@/types/settings";
import { getSettings } from "@/utils/settings";

let timeout: NodeJS.Timeout | undefined;
export default function Settings() {
  const [homeAssistantUrl, setHomeAssistantUrl] = useState<string>("");

  useEffect(() => {
    const settings: Settings = getSettings();
    console.log("Settings:", settings);
    setHomeAssistantUrl(settings.homeAssistant?.url || "");
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setHomeAssistantUrl(event.target.value);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      let settings: Settings = getSettings() || { homeAssistant: {} };
      console.log("Current settings:", settings);
      settings.homeAssistant.url = event.target.value;
      localStorage.setItem("settings", JSON.stringify(settings));
      console.log("Saved settings:", settings);
    }, 500);
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">Settings</h2>
      <form>
        <label className="block">
          <span className="flex flex-row items-center gap-3">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <span className="block text-sm font-medium text-gray-200">
              Home Assistant URL
            </span>
          </span>
          <input
            className="mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
            type="text"
            autoFocus
            name="homeAssistant.url"
            aria-label="Home Assistant URL"
            onChange={handleChange}
            value={homeAssistantUrl}
          />
        </label>
      </form>
    </>
  );
}
