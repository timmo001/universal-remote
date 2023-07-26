"use client";
import { MouseEvent, useMemo } from "react";
import Icon from "@mdi/react";

import type { MediaSetting } from "@/types/settings";
import { useHomeAssistant } from "@/providers/homeAssistant";
import {
  mdiMusicNoteOutline,
  mdiPause,
  mdiPlay,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import { HassEntity } from "home-assistant-js-websocket";

export default function ControllerMedia({ media }: { media: MediaSetting }) {
  const homeAssistant = useHomeAssistant();

  const entity = useMemo<HassEntity | undefined>(() => {
    if (!media.entity || !homeAssistant.entities) return undefined;
    return homeAssistant.entities[media.entity];
  }, [homeAssistant.entities, media.entity]);

  const isPlaying = useMemo<boolean>(() => {
    if (!entity) return false;
    return entity.state === "playing" || entity.state === "buffering";
  }, [entity]);

  const picture = useMemo<string | undefined>(() => {
    if (!entity?.attributes?.entity_picture) return undefined;
    return entity.attributes.entity_picture.startsWith("/api")
      ? `${homeAssistant.client?.baseUrl()}${entity.attributes.entity_picture}`
      : entity.attributes.entity_picture;
  }, [entity, homeAssistant.client]);

  if (!entity)
    return (
      <>
        <h2 className="mb-2 text-2xl font-bold">No media player defined</h2>
      </>
    );

  return (
    <>
      <div className="grid min-w-full grid-cols-5 gap-x-3 gap-y-1">
        <section className="col-span-2 flex items-center">
          {picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="m-auto w-full rounded-lg"
              alt={entity.attributes?.friendly_name ?? media.entity}
              src={picture}
            />
          ) : (
            <Icon
              title={entity.attributes?.friendly_name ?? media.entity}
              size={3}
              path={mdiMusicNoteOutline}
            />
          )}
        </section>

        <section className="col-span-3">
          <div className="grid min-w-full grid-cols-1 gap-x-1 gap-y-1">
            <h3 className="pt-1 text-lg font-bold">
              {entity.attributes?.media_title}
            </h3>
            <h4 className="text-sm font-bold">
              {entity.attributes?.media_artist}
            </h4>
            <h5 className="text-xs">{entity.attributes?.media_album_name}</h5>
            <div className="flex-grow" />
            <div className="grid min-w-full grid-cols-3 gap-x-1 gap-y-1">
              <button
                className="rounded-full p-2"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  homeAssistant.client?.callService(
                    "media_player",
                    "media_previous_track",
                    { entity_id: media.entity },
                  );
                }}
              >
                <Icon size={1} title="Previous" path={mdiSkipPrevious} />
              </button>
              <button
                className="rounded-full p-2"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  homeAssistant.client?.callService(
                    "media_player",
                    isPlaying ? "media_pause" : "media_play",
                    { entity_id: media.entity },
                  );
                }}
              >
                <Icon
                  size={1}
                  title={isPlaying ? "Pause" : "Pause"}
                  path={isPlaying ? mdiPause : mdiPlay}
                />
              </button>
              <button
                className="rounded-full p-2"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  homeAssistant.client?.callService(
                    "media_player",
                    "media_next_track",
                    { entity_id: media.entity },
                  );
                }}
              >
                <Icon size={1} title="Next" path={mdiSkipNext} />
              </button>
            </div>
          </div>
        </section>
      </div>
      <section className="grid min-w-full grid-cols-1 gap-x-1 gap-y-1"></section>
    </>
  );
}
