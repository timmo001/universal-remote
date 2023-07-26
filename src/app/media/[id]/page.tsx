"use client";
import { useEffect, useMemo, useState } from "react";
import { mdiMusicNoteOutline } from "@mdi/js";
import Icon from "@mdi/react";

import type { EntitySetting, MediaSetting } from "@/types/settings";
import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";
import { useSettings } from "@/providers/settings";
import ControllerMedia from "@/components/controllerMedia";
import List from "@/components/list";

export default function Media({ params }: { params: { id: string } }) {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  const [media, setMedia] = useState<MediaSetting>();

  useEffect(() => {
    if (
      !params.id ||
      !settings?.media?.entities ||
      settings.media.entities.length < 1
    )
      return;
    setMedia(
      settings.media.entities.find((value) => value.entity === params.id),
    );
  }, [params.id, settings?.media?.entities]);

  const items = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (
      !entities ||
      !settings?.media?.entities ||
      settings.media.entities.length < 1
    )
      return [];
    return settings.media?.entities.map((item: EntitySetting): ListItem => {
      const name =
        homeAssistant.entities?.[item.entity]?.attributes?.friendly_name ??
        item.entity;

      return {
        key: item.entity,
        type: ListItemType.Source,
        name:
          homeAssistant.entities?.[item.entity]?.attributes?.friendly_name ??
          item.entity,
        icon: <Icon title={name} size={1} path={mdiMusicNoteOutline} />,
        selected: item.entity === media?.entity,
        url: `/media/${item.entity}`,
      };
    });
  }, [homeAssistant.entities, media?.entity, settings?.media?.entities]);

  if (!settings?.media?.entities || settings.media.entities.length < 1)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No media player defined</h2>
        <p>
          Please add an entity in <a href="/settings">settings</a>.
        </p>
      </>
    );

  if (!media)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">Loading data..</h2>
      </>
    );

  return (
    <>
      <List items={items} />
      <ControllerMedia media={media} />
    </>
  );
}
