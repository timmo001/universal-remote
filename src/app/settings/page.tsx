"use client";
import { ChangeEvent, ChangeEventHandler } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";

import { useSettings } from "@/providers/settings";

function TextInput({
  value,
  handleChange,
}: {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block w-full">
      <span className="flex flex-row items-center gap-3">
        <HomeIcon className="h-6 w-6 text-gray-400" />
        <span className="block text-sm font-medium text-gray-200">
          TV Entities
        </span>
      </span>
      <input
        className="mt-1 block w-full rounded-md border-gray-900 bg-gray-900 px-2 py-1 text-gray-200 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
        type="text"
        name="tv.entities"
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
      <form className="w-full">
        <TextInput
          value={settings?.tv?.entities?.join(",") || ""}
          handleChange={handleChange}
        />
      </form>
    </>
  );
}
