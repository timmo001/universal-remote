"use client";
import { ChangeEvent, MouseEvent, useMemo } from "react";
import Icon from "@mdi/react";

import type { MediaSetting } from "@/types/settings";
import { useHomeAssistant } from "@/providers/homeAssistant";
import {
  mdiMusicNoteOutline,
  mdiPause,
  mdiPlay,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiVolumeHigh,
  mdiVolumeMute,
} from "@mdi/js";
import { MediaPlayerEntity } from "@/types/homeAssistant/mediaPlayer";

export default function ControllerMedia({ media }: { media: MediaSetting }) {
  const homeAssistant = useHomeAssistant();

  const entity = useMemo<MediaPlayerEntity | undefined>(() => {
    if (!media.entity || !homeAssistant.entities) return undefined;
    return homeAssistant.entities[media.entity] as MediaPlayerEntity;
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

  const volume = useMemo<number>(() => {
    if (!entity?.attributes?.volume_level) return 0;
    return entity.attributes.volume_level * 100;
  }, [entity]);

  const isMuted = useMemo<boolean>(() => {
    if (!entity?.attributes?.is_volume_muted) return false;
    return entity.attributes.is_volume_muted;
  }, [entity]);

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

        <section className="col-span-3 flex min-w-full flex-col gap-1">
          <h3 className="pt-1 text-2xl font-bold">
            {entity.attributes?.media_title}
          </h3>
          <h4 className="text-md font-medium">
            {entity.attributes?.media_artist}
          </h4>
          <h5 className="text-xs font-medium">
            {entity.attributes?.media_album_name}
          </h5>
          <div className="flex-1" />
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
        </section>
      </div>
      <section className="grid min-w-full grid-cols-1 gap-x-1 gap-y-1">
        <div className="flex w-full flex-row items-center gap-x-2">
          <button
            className="rounded-full p-2"
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              homeAssistant.client?.callService("media_player", "volume_mute", {
                entity_id: media.entity,
                is_volume_muted: !isMuted,
              });
            }}
          >
            <Icon
              size={1}
              title="Volume"
              path={isMuted ? mdiVolumeMute : mdiVolumeHigh}
            />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              homeAssistant.client?.callService("media_player", "volume_set", {
                entity_id: media.entity,
                volume_level: Number(e.currentTarget.value) / 100,
              });
            }}
            className="h-2 w-full appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(var(--green-rgb)) ${volume}%, rgb(var(--background-end-rgb)) ${volume}%)`,
            }}
          />
        </div>
      </section>
    </>
  );
}
