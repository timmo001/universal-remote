"use client";
import { TvIcon, ServerIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";
import Remote from "@/components/remote";

export default function TV() {
  const { settings } = useSettings();
  const homeAssitant = useHomeAssistant();

  const sources: Array<ListItem> = [
    {
      key: "tv",
      name: "TV",
      icon: <TvIcon className="h-6 w-6 text-gray-400" />,
    },
    {
      key: "setTopBox",
      name: "Set-top Box",
      icon: <ServerIcon className="h-6 w-6 text-gray-400" />,
    },
    {
      key: "disneyPlus",
      name: "Disney+",
      icon: <span className="text-lg">D+</span>,
    },
    {
      key: "netflix",
      name: "Netflix",
      icon: <span className="mr-3 text-lg">N</span>,
    },
    {
      key: "primeVideo",
      name: "Prime Video",
      icon: <span className="mr-3 text-lg">P</span>,
    },
    {
      key: "youtube",
      name: "YouTube",
      icon: <span className="mr-3 text-lg">Y</span>,
    },
  ];

  if (!settings?.tv?.entities || settings.tv.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No TV defined</h2>
        <p>
          Please add an entity in <a href="/settings">settings</a>.
        </p>
      </>
    );

  return (
    <>
      <Remote />
      <h2 className="mb-2 text-2xl font-bold">Sources</h2>
      <List items={sources} />
    </>
  );
}
