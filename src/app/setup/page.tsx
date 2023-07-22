"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { CodeBracketIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { useSettings } from "@/providers/settings";
import TextInput from "@/components/textInput";

export default function Setup() {
  const [homeAssistantAccessToken, setHomeAssistantAccessToken] =
    useState<string>("");
  const [homeAssistantUrl, setHomeAssistantUrl] = useState<string>("");
  const { settings, updateSettings } = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (homeAssistantAccessToken || homeAssistantUrl) return;
    setHomeAssistantUrl(settings?.homeAssistant?.url || "");
    setHomeAssistantAccessToken(settings?.homeAssistant?.accessToken || "");
  }, [homeAssistantAccessToken, homeAssistantUrl, settings?.homeAssistant]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.name === "homeAssistant.accessToken")
      setHomeAssistantAccessToken(event.target.value);
    else if (event.target.name === "homeAssistant.url")
      setHomeAssistantUrl(event.target.value);
  }

  function handleSetup(): void {
    if (!settings) return;
    console.log("Current settings:", settings);
    settings.homeAssistant.accessToken = homeAssistantAccessToken;
    settings.homeAssistant.url = homeAssistantUrl;
    updateSettings(settings);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">
        Please enter Home Assistant URL and Long Lived Access Token
      </h2>
      <form className="flex w-full flex-col gap-4">
        <TextInput
          name="homeAssistant.url"
          label="URL"
          icon={<HomeIcon className="h-6 w-6 text-gray-200" />}
          value={homeAssistantUrl}
          handleChange={handleChange}
        />
        <TextInput
          name="homeAssistant.accessToken"
          label="Long Lived Access Token"
          icon={<CodeBracketIcon className="h-6 w-6 text-gray-200" />}
          value={homeAssistantAccessToken}
          handleChange={handleChange}
        />
      </form>
      <button
        className="mt-4 w-full rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        onClick={() => handleSetup()}
      >
        Save
      </button>
    </>
  );
}
