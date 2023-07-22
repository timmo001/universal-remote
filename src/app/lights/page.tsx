"use client";
import { useEffect, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";

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
    if (settings.lights?.entities.length === 0) return;
    const newItems = settings.lights?.entities.map((entity: string) => ({
      key: entity,
      name:
        homeAssistant.entities?.[entity]?.attributes?.friendly_name ?? entity,
      icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
    }));
    setItems(newItems);
  }, [settings, homeAssistant.entities]);

  if (!settings?.lights?.entities || settings.lights.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No lights defined</h2>
        <p>
          Please add an entity in <a href="/settings">settings</a>.
        </p>
      </>
    );

  return (
    <>
      <List items={items} />
    </>
  );
}
