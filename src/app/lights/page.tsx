"use client";
import { useMemo } from "react";
import { mdiLightbulbOutline } from "@mdi/js";
import Icon from "@mdi/react";

import type { EntitySetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
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
    return settings.lights?.entities.map((item: EntitySetting): ListItem => {
      const name =
        homeAssistant.entities?.[item.entity]?.attributes?.friendly_name ??
        item.entity;

      return {
        key: item.entity,
        type: ListItemType.Entity,
        name: name,
        icon: <Icon title={name} size={1} path={mdiLightbulbOutline} />,
        onClick: () => {
          homeAssistant.client?.callService("light", "toggle", {
            entity_id: item.entity,
          });
        },
      };
    });
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
