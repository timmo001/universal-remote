"use client";
import { ChangeEvent } from "react";
import {
  LightBulbIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import { useSettings } from "@/providers/settings";
import TextInput from "@/components/textInput";
import Link from "next/link";

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
        <Link href="/setup">
          <button className="mt-4 w-full rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
            Update Home Assistant Configuration
          </button>
        </Link>
      </form>
    </>
  );
}
