"use client";
import { useEffect, useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";

export default function Lights() {
  const [items, setItems] = useState<ListItem[]>([]);

  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  useEffect(() => {
    if (!settings || !homeAssistant.entities) return;
    if (settings.music?.entities.length === 0) return;
    const newItems = settings.music.entities.map((entity: string) => ({
      key: entity,
      name:
        homeAssistant.entities?.[entity]?.attributes?.friendly_name ?? entity,
      icon: <SpeakerWaveIcon className="h-6 w-6 text-gray-400" />,
    }));
    setItems(newItems);
  }, [settings, homeAssistant.entities]);

  return (
    <>
      <List items={items} />
    </>
  );
}
