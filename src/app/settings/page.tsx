"use client";
import { ChangeEvent } from "react";
import {
  LightBulbIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import { useSettings } from "@/providers/settings";
import TextInput from "@/components/textInput";

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (!settings) return;
    const nameSplit = event.target.name.split(".");
    updateSettings({
      ...settings,
      [nameSplit[0]]: {
        ...settings[nameSplit[0] as keyof typeof settings],
        [nameSplit[1]]: event.target.value.split(","),
      },
    });
  }

  return (
    <>
      <form className="flex w-full flex-col gap-4">
        <TextInput
          name="tv.entities"
          label="TV Entities"
          icon={<TvIcon className="h-6 w-6 text-gray-200" />}
          value={settings?.tv?.entities?.join(",") || ""}
          handleChange={handleChange}
        />
        <TextInput
          name="music.entities"
          label="Music Entities"
          icon={<MusicalNoteIcon className="h-6 w-6 text-gray-200" />}
          value={settings?.music?.entities?.join(",") || ""}
          handleChange={handleChange}
        />
        <TextInput
          name="lights.entities"
          label="Light Entities"
          icon={<LightBulbIcon className="h-6 w-6 text-gray-200" />}
          value={settings?.lights?.entities?.join(",") || ""}
          handleChange={handleChange}
        />
      </form>
    </>
  );
}
