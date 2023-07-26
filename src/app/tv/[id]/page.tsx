"use client";
import { useEffect, useMemo, useState } from "react";
import { mdiTelevision } from "@mdi/js";
import Icon from "@mdi/react";

import { TVType, type TVSetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import List from "@/components/list";
import RemoteLGHorizon from "@/components/remoteLGHorizon";
import RemoteLGWebOS from "@/components/remoteLGWebOS";

export default function TV({ params }: { params: { id: string } }) {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const [tv, setTV] = useState<TVSetting>();

  useEffect(() => {
    if (
      !params.id ||
      !settings?.tv?.entities ||
      settings.tv.entities.length < 1
    )
      return;
    setTV(settings.tv.entities.find((value) => value.entity === params.id));
  }, [params.id, settings?.tv?.entities]);

  const tvSources = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (!settings?.tv?.entities || settings.tv.entities.length < 1) return [];

    return settings.tv.entities.map((value: TVSetting): ListItem => {
      const name = entities
        ? entities[value.entity].attributes.friendly_name || value.entity
        : value.entity;

      return {
        key: value.entity,
        type: ListItemType.Source,
        name: name,
        icon: <Icon title={name} size={1} path={mdiTelevision} />,
        selected: value.entity === tv?.entity,
        url: `/tv/${value.entity}`,
      };
    });
  }, [tv, homeAssistant.entities, settings?.tv?.entities]);

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

  if (!tv)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">Loading data..</h2>
      </>
    );

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
      <List items={tvSources} />
      {tv.type === TVType.LGWebOS ? (
        <RemoteLGWebOS tv={tv} />
      ) : tv.type === TVType.LGHorizon ? (
        <RemoteLGHorizon tv={tv} />
      ) : null}
      <h2 className="mb-2 text-2xl font-bold">Sources</h2>
      <List items={sources} />
    </>
  );
}
