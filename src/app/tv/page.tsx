"use client";
import { useMemo } from "react";
import { TvIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";
import Remote from "@/components/remote";

const defaultSources: Array<ListItem> = [
  {
    key: "tv",
    name: "TV",
    icon: <TvIcon className="h-6 w-6 text-gray-400" />,
  },
];

export default function TV() {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const entity = useMemo<string>(() => {
    if (!settings?.tv?.entities || settings.tv.entities.length < 1) return "";
    return settings.tv.entities[0];
  }, [settings?.tv?.entities]);

  const sources = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (!entities || !settings?.tv?.entities || settings.tv.entities.length < 1)
      return defaultSources;

    const source_list = entities[entity].attributes.source_list;
    if (!source_list) return defaultSources;

    return source_list.map(
      (source: string): ListItem => ({
        key: source,
        name: source,
        icon: <TvIcon className="h-6 w-6 text-gray-400" />,
        onClick: () => {
          homeAssistant.client?.callService("media_player", "select_source", {
            entity_id: entity,
            source: source,
          });
        },
      }),
    );
  }, [
    entity,
    homeAssistant.client,
    homeAssistant.entities,
    settings?.tv?.entities,
  ]);

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
      <Remote entity={entity} />
      <h2 className="mb-2 text-2xl font-bold">Sources</h2>
      <List items={sources} />
    </>
  );
}
