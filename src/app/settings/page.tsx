"use client";
import { ChangeEvent, ChangeEventHandler } from "react";
import {
  LightBulbIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import { useSettings } from "@/providers/settings";

function TextInput({
  name,
  label,
  icon,
  value,
  handleChange,
}: {
  name: string;
  label?: string;
  icon?: JSX.Element;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block w-full">
      <span className="flex flex-row items-center gap-2">
        {icon}
        <span className="block text-sm font-medium text-gray-200">{label}</span>
      </span>
      <input
        className="mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
        type="text"
        name={name}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}

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
