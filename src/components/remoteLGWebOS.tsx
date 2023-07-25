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
  mdiInformationOutline,
  mdiMenu,
  mdiMinus,
  mdiPause,
  mdiPlay,
  mdiPlus,
  mdiPower,
  mdiRewind,
  mdiStop,
  mdiTelevisionGuide,
  mdiVolumeOff,
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

export default function RemoteLGWebOS({ tv }: { tv: TVSetting }) {
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
    homeAssistant.client.callService("webostv", "button", {
      entity_id: tv.entity,
      button: event.currentTarget.name,
    });
  }

  function handleCommandClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Command clicked:", event.currentTarget.name);
    if (!settings || !settings.tv || !settings.tv.entities) {
      console.error("No TV defined");
      return;
    }
    if (!homeAssistant.client) {
      console.error("No Home Assistant client");
      return;
    }
    homeAssistant.client.callService("webostv", "command", {
      entity_id: tv.entity,
      command: event.currentTarget.name,
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
    if (state === "off" && tv.macAddress) {
      homeAssistant.client.callService("wake_on_lan", "send_magic_packet", {
        mac: tv.macAddress,
      });
    } else {
      homeAssistant.client.callService(
        "media_player",
        state !== "off" ? "turn_off" : "turn_on",
        {
          entity_id: tv.entity,
        },
      );
    }
  }

  if (!settings || !settings.tv || !settings.tv.entities)
    return <h2 className="mb-2 text-2xl font-bold">No TV defined</h2>;

  return (
    <>
      <section className="grid min-w-full grid-cols-1 gap-x-1 gap-y-1">
        <Button
          name="POWER"
          icon={<Icon title="POWER" size={1.2} path={mdiPower} color="red" />}
          onClick={handlePowerClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-1 gap-y-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            name={number.toString()}
            icon={<span className="text-2xl">{number}</span>}
            onClick={handleButtonClick}
          />
        ))}
        <Button
          name="INFO"
          icon={<Icon title="INFO" size={1.2} path={mdiInformationOutline} />}
          onClick={handleButtonClick}
        />
        <Button
          name="0"
          icon={<span className="text-2xl">0</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="GUIDE"
          icon={<Icon title="GUIDE" size={1.2} path={mdiTelevisionGuide} />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-1 gap-y-1">
        <Button
          name="VOLUMEUP"
          icon={<Icon title="VOLUMEUP" size={1.2} path={mdiPlus} />}
          onClick={handleButtonClick}
        />
        <Button
          name="MUTE"
          icon={<Icon title="MUTE" size={1.2} path={mdiVolumeOff} />}
          onClick={handleButtonClick}
        />
        <Button
          name="CHANNELUP"
          icon={<Icon title="CHANNELUP" size={1.2} path={mdiChevronUp} />}
          onClick={handleButtonClick}
        />
        <Button
          name="VOLUMEDOWN"
          icon={<Icon title="VOLUMEDOWN" size={1.2} path={mdiMinus} />}
          onClick={handleButtonClick}
        />
        <div />
        <Button
          name="CHANNELDOWN"
          icon={<Icon title="CHANNELDOWN" size={1.2} path={mdiChevronDown} />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-2 gap-y-4">
        <Button
          name="HOME"
          icon={<Icon title="HOME" size={1.2} path={mdiHomeOutline} />}
          onClick={handleButtonClick}
        />
        <Button
          name="UP"
          icon={<Icon title="UP" size={1.2} path={mdiChevronUp} />}
          onClick={handleButtonClick}
        />
        <Button
          name="MENU"
          icon={<Icon title="MENU" size={1.2} path={mdiMenu} />}
          onClick={handleButtonClick}
        />
        <Button
          name="LEFT"
          icon={<Icon title="LEFT" size={1.2} path={mdiChevronLeft} />}
          onClick={handleButtonClick}
        />
        <Button
          name="ENTER"
          icon={<span className="text-2xl">OK</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="RIGHT"
          icon={<Icon title="RIGHT" size={1.2} path={mdiChevronRight} />}
          onClick={handleButtonClick}
        />
        <Button
          name="BACK"
          icon={<Icon title="BACK" size={1.2} path={mdiArrowLeft} />}
          onClick={handleButtonClick}
        />
        <Button
          name="DOWN"
          icon={<Icon title="DOWN" size={1.2} path={mdiChevronDown} />}
          onClick={handleButtonClick}
        />
        <Button
          name="EXIT"
          icon={<span className="text-1xl">EXIT</span>}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-4 justify-between gap-x-1 gap-y-1">
        <Button
          name="media.controls/rewind"
          icon={<Icon title="REWIND" size={1.2} path={mdiRewind} />}
          onClick={handleCommandClick}
        />
        <Button
          name="media.controls/play"
          icon={<Icon title="PLAY" size={1.2} path={mdiPlay} />}
          onClick={handleCommandClick}
        />
        <Button
          name="media.controls/pause"
          icon={<Icon title="PAUSE" size={1.2} path={mdiPause} />}
          onClick={handleCommandClick}
        />
        <Button
          name="media.controls/fastForward"
          icon={<Icon title="FASTFORWARD" size={1.2} path={mdiFastForward} />}
          onClick={handleCommandClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-2 justify-between gap-x-1 gap-y-1">
        <Button
          name="media.controls/stop"
          icon={<Icon title="STOP" size={1.2} path={mdiStop} />}
          onClick={handleCommandClick}
        />
        <Button
          name="media.controls/Record"
          icon={<span className="h-5 w-5 rounded-full bg-red-600" />}
          onClick={handleCommandClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-4 gap-x-1 gap-y-1">
        <Button
          name="RED"
          icon={<span className="h-4 w-8 rounded-full bg-red-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="GREEN"
          icon={<span className="h-4 w-8 rounded-full bg-green-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="YELLOW"
          icon={<span className="h-4 w-8 rounded-full bg-yellow-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="BLUE"
          icon={<span className="h-4 w-8 rounded-full bg-blue-600" />}
          onClick={handleButtonClick}
        />
      </section>
    </>
  );
}
