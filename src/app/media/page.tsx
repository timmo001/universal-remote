"use client";
import { useMemo } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import type { EntitySetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";

export default function Media() {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const items = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (
      !entities ||
      !settings?.music?.entities ||
      settings.music.entities.length < 1
    )
      return [];
    return settings.music?.entities.map(
      (item: EntitySetting): ListItem => ({
        key: item.entity,
        type: ListItemType.Entity,
        name:
          homeAssistant.entities?.[item.entity]?.attributes?.friendly_name ??
          item.entity,
        icon: <SpeakerWaveIcon className="h-6 w-6" />,
        onClick: () => {
          homeAssistant.client?.callService(
            "media_player",
            entities[item.entity].state === "off" ? "turn_on" : "turn_off",
            {
              entity_id: item.entity,
            },
          );
        },
      }),
    );
  }, [homeAssistant.client, homeAssistant.entities, settings?.music?.entities]);

  if (!settings?.music?.entities || settings.music.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No music player defined</h2>
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
