"use client";
import { useMemo } from "react";
import { mdiTelevision } from "@mdi/js";
import Icon from "@mdi/react";

import type { TVSetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";
import Remote from "@/components/remote";

export default function TV() {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const tv = useMemo<TVSetting | null>(() => {
    if (!settings?.tv?.entities || settings.tv.entities.length < 1) return null;
    return settings.tv.entities[0];
  }, [settings?.tv?.entities]);

  const sources = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (
      !tv ||
      !entities ||
      !settings?.tv?.entities ||
      settings.tv.entities.length < 1
    )
      return [];

    const source_list = entities[tv.entity].attributes.source_list;
    if (!source_list) return [];

    return source_list.map(
      (source: string): ListItem => ({
        key: source,
        type: ListItemType.Source,
        name: source,
        icon: <Icon title={source} size={1} path={mdiTelevision} />,
        onClick: () => {
          homeAssistant.client?.callService("media_player", "select_source", {
            entity_id: tv.entity,
            source: source,
          });
        },
      }),
    );
  }, [
    tv,
    homeAssistant.client,
    homeAssistant.entities,
    settings?.tv?.entities,
  ]);

  if (!tv || !settings?.tv?.entities || settings.tv.entities.length < 1)
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
      <Remote tv={tv} />
      <h2 className="mb-2 text-2xl font-bold">Sources</h2>
      <List items={sources} />
    </>
  );
}
