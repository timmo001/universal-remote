"use client";
import { MouseEvent, MouseEventHandler } from "react";
import Icon from "@mdi/react";

import type { TVSetting } from "@/types/settings";
import { useSettings } from "@/providers/settings";
import { useHomeAssistant } from "@/providers/homeAssistant";
import {
  mdiArrowLeft,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronUp,
  mdiFastForward,
  mdiHomeOutline,
  mdiMenu,
  mdiPlayPause,
  mdiPower,
  mdiRewind,
  mdiTelevision,
  mdiTelevisionGuide,
} from "@mdi/js";

function Button({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="h-16" name={name} onClick={onClick}>
      {icon}
    </button>
  );
}

export default function RemoteLGHorizon({ tv }: { tv: TVSetting }) {
  const { settings } = useSettings();
  const homeAssistant = useHomeAssistant();

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Button clicked:", event.currentTarget.name);
    if (!settings || !settings.tv || !settings.tv.entities) {
      console.error("No TV defined");
      return;
    }
    if (!homeAssistant.client) {
      console.error("No Home Assistant client");
      return;
    }
    homeAssistant.client.callService("lghorizon", "remote_key_press", {
      entity_id: tv.entity,
      remote_key: event.currentTarget.name,
    });
  }

  function handlePowerClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Power clicked:", event.currentTarget.name);
    if (!settings || !settings.tv || !settings.tv.entities) {
      console.error("No TV defined");
      return;
    }
    if (!homeAssistant.client) {
      console.error("No Home Assistant client");
      return;
    }
    if (!homeAssistant.entities) {
      console.error("No Home Assistant entities");
      return;
    }
    const state = homeAssistant.entities[tv.entity].state;
    homeAssistant.client.callService(
      "media_player",
      state !== "off" ? "turn_off" : "turn_on",
      {
        entity_id: tv.entity,
      },
    );
  }

  if (!settings || !settings.tv || !settings.tv.entities)
    return <h2 className="mb-2 text-2xl font-bold">No TV defined</h2>;

  return (
    <>
      <section className="grid grid-cols-1 gap-x-1 gap-y-1">
        <Button
          name="POWER"
          icon={<Icon title="POWER" size={1.2} path={mdiPower} color="red" />}
          onClick={handlePowerClick}
        />
        <Button
          name="MediaTopMenu"
          icon={<Icon title="HOME" size={1.2} path={mdiHomeOutline} />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid grid-cols-3 gap-x-12 gap-y-4">
        <Button
          name="Guide"
          icon={<Icon title="Guide" size={1.2} path={mdiTelevisionGuide} />}
          onClick={handleButtonClick}
        />
        <Button
          name="ArrowUp"
          icon={<Icon title="ArrowUp" size={1.2} path={mdiChevronUp} />}
          onClick={handleButtonClick}
        />
        <Button
          name="TV"
          icon={<Icon title="TV" size={1.2} path={mdiTelevision} />}
          onClick={handleButtonClick}
        />
        <Button
          name="ArrowLeft"
          icon={<Icon title="ArrowLeft" size={1.2} path={mdiChevronLeft} />}
          onClick={handleButtonClick}
        />
        <Button
          name="Enter"
          icon={<span className="text-2xl">OK</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="ArrowRight"
          icon={<Icon title="ArrowRight" size={1.2} path={mdiChevronRight} />}
          onClick={handleButtonClick}
        />
        <Button
          name="Escape"
          icon={<Icon title="Escape" size={1.2} path={mdiArrowLeft} />}
          onClick={handleButtonClick}
        />
        <Button
          name="ArrowDown"
          icon={<Icon title="ArrowDown" size={1.2} path={mdiChevronDown} />}
          onClick={handleButtonClick}
        />
        <Button
          name="ContextMenu"
          icon={<Icon title="ContextMenu" size={1.2} path={mdiMenu} />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid grid-cols-3 gap-x-12 gap-y-4">
        <div />
        <div />
        <Button
          name="ChannelUp"
          icon={<Icon title="ChannelUp" size={1.2} path={mdiChevronUp} />}
          onClick={handleButtonClick}
        />
        <div />
        <Button
          name="MediaRecord"
          icon={<span className="h-5 w-5 rounded-full bg-red-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="ChannelDown"
          icon={<Icon title="ChannelDown" size={1.2} path={mdiChevronDown} />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid grid-cols-3 justify-between gap-x-12 gap-y-1">
        <Button
          name="MediaRewind"
          icon={<Icon title="MediaRewind" size={1.2} path={mdiRewind} />}
          onClick={handleButtonClick}
        />
        <Button
          name="MediaPlayPause"
          icon={<Icon title="MediaPlayPause" size={1.2} path={mdiPlayPause} />}
          onClick={handleButtonClick}
        />
        <Button
          name="MediaFastForward"
          icon={
            <Icon title="MediaFastForward" size={1.2} path={mdiFastForward} />
          }
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid grid-cols-3 gap-x-12 gap-y-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            name={number.toString()}
            icon={<span className="text-2xl">{number}</span>}
            onClick={handleButtonClick}
          />
        ))}
        <div />
        <Button
          name="0"
          icon={<span className="text-2xl">0</span>}
          onClick={handleButtonClick}
        />
        <div />
      </section>
    </>
  );
}
