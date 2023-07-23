"use client";
import { useEffect, useMemo, useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

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
      !settings?.music?.entities ||
      settings.music.entities.length < 1
    )
      return [];
    return settings.music?.entities.map(
      (entity: string): ListItem => ({
        key: entity,
        name:
          homeAssistant.entities?.[entity]?.attributes?.friendly_name ?? entity,
        icon: <SpeakerWaveIcon className="h-6 w-6 text-gray-400" />,
        onClick: () => {
          homeAssistant.client?.callService(
            "media_player",
            entities[entity].state === "off" ? "turn_on" : "turn_off",
            {
              entity_id: entity,
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
