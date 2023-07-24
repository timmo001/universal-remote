"use client";
import { useMemo } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";

import type { EntitySetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";

export default function Switches() {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const items = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (
      !entities ||
      !settings?.switches?.entities ||
      settings.switches.entities.length < 1
    )
      return [];
    return settings.switches?.entities.map(
      (item: EntitySetting): ListItem => ({
        key: item.entity,
        type: ListItemType.Entity,
        name:
          homeAssistant.entities?.[item.entity]?.attributes?.friendly_name ??
          item.entity,
        icon: <LightBulbIcon className="h-6 w-6" />,
        onClick: () => {
          homeAssistant.client?.callService("switch", "toggle", {
            entity_id: item.entity,
          });
        },
      }),
    );
  }, [
    homeAssistant.client,
    homeAssistant.entities,
    settings?.switches?.entities,
  ]);

  if (!settings?.switches?.entities || settings.switches.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No switches defined</h2>
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
