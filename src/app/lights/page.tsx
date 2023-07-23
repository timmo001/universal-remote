"use client";
import { useMemo } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";

export default function Lights() {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const items = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (
      !entities ||
      !settings?.lights?.entities ||
      settings.lights.entities.length < 1
    )
      return [];
    return settings.lights?.entities.map(
      (entity: string): ListItem => ({
        key: entity,
        name:
          homeAssistant.entities?.[entity]?.attributes?.friendly_name ?? entity,
        icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
        onClick: () => {
          homeAssistant.client?.callService("light", "toggle", {
            entity_id: entity,
          });
        },
      }),
    );
  }, [
    homeAssistant.client,
    homeAssistant.entities,
    settings?.lights?.entities,
  ]);

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
