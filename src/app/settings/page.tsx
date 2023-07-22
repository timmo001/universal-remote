"use client";
import { ChangeEvent } from "react";
import {
  LightBulbIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useSettings } from "@/providers/settings";
import InputEntities from "@/components/inputEntities";

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (!settings) return;
    const nameSplit = event.target.name.split(".");
    console.log("Settings: update:", nameSplit, event.target.value);
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
        <Link href="/setup">
          <button className="mb-2 w-full rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
            Update Home Assistant Configuration
          </button>
        </Link>
        <InputEntities
          name="tv.entities"
          label="TV Entities"
          icon={<TvIcon className="h-6 w-6 text-gray-200" />}
          filters={["media_player"]}
          value={settings?.tv?.entities || []}
          handleChange={handleChange}
        />
        <InputEntities
          name="music.entities"
          label="Music Entities"
          icon={<MusicalNoteIcon className="h-6 w-6 text-gray-200" />}
          filters={["media_player"]}
          value={settings?.music?.entities || []}
          handleChange={handleChange}
        />
        <InputEntities
          name="lights.entities"
          label="Light Entities"
          icon={<LightBulbIcon className="h-6 w-6 text-gray-200" />}
          filters={["light"]}
          value={settings?.lights?.entities || []}
          handleChange={handleChange}
        />
      </form>
    </>
  );
}
