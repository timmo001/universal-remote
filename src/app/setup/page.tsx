"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mdiLink, mdiLockOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useSettings } from "@/providers/settings";
import InputText from "@/components/inputText";

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
      <p className="mb-2 text-orange-500">
        Make sure your Home Assistant URL protocol is the same as the url you
        are using. If you are using https, make sure your url starts with
        https:// and vice versa (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content"
          target="_blank"
        >
          Mixed content
        </a>
        )
      </p>
      <form className="flex w-full flex-col gap-4">
        <InputText
          name="homeAssistant.url"
          label="URL"
          icon={<Icon title="URL" size={1} path={mdiLink} />}
          value={homeAssistantUrl}
          handleChange={handleChange}
        />
        <InputText
          name="homeAssistant.accessToken"
          label="Long Lived Access Token"
          icon={<Icon title="URL" size={1} path={mdiLockOutline} />}
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
