"use client";
import { MouseEvent, MouseEventHandler } from "react";
import {
  ArrowUturnLeftIcon,
  BackwardIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  ForwardIcon,
  HomeIcon,
  InformationCircleIcon,
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  PowerIcon,
  SpeakerXMarkIcon,
  StopIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import { useSettings } from "@/providers/settings";
import { useHomeAssistant } from "@/providers/homeAssistant";

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

export default function Remote({ entity }: { entity: string }) {
  const { settings } = useSettings();
  const homeAssitant = useHomeAssistant();

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Button clicked:", event.currentTarget.name);
    if (!settings || !settings.tv || !settings.tv.entities) {
      console.error("No TV defined");
      return;
    }
    if (!homeAssitant.client) {
      console.error("No Home Assistant client");
      return;
    }
    homeAssitant.client.callService("webostv", "button", {
      entity_id: entity,
      command: event.currentTarget.name,
    });
  }

  if (!settings || !settings.tv || !settings.tv.entities)
    return <h2 className="mb-2 text-2xl font-bold">No TV defined</h2>;

  return (
    <>
      <section className="grid min-w-full grid-cols-1 gap-x-1 gap-y-1">
        <Button
          name="power"
          icon={<PowerIcon className="h-6 w-6 text-red-600" />}
          onClick={handleButtonClick}
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
          icon={<InformationCircleIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="0"
          icon={<span className="text-2xl">0</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="MENU"
          icon={<span className="text-2xl">...</span>}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-1 gap-y-1">
        <Button
          name="VOLUMEUP"
          icon={<PlusIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="MUTE"
          icon={<SpeakerXMarkIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="CHANNELUP"
          icon={<ChevronUpIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="VOLUMEDOWN"
          icon={<MinusIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <div />
        <Button
          name="CHANNELDOWN"
          icon={<ChevronDownIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-2 gap-y-4">
        <Button
          name="HOME"
          icon={<HomeIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="UP"
          icon={<ChevronUpIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="SETTINGS"
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="LEFT"
          icon={<ChevronLeftIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="ENTER"
          icon={<span className="text-2xl">OK</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="RIGHT"
          icon={<ChevronRightIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="BACK"
          icon={<ArrowUturnLeftIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="DOWN"
          icon={<ChevronDownIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="EXIT"
          icon={<span className="text-2xl">EXIT</span>}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-2 justify-between gap-x-1 gap-y-1">
        <Button
          name="play"
          icon={<PlayIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="pause"
          icon={<PauseIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-4 gap-x-1 gap-y-1">
        <Button
          name="red"
          icon={<span className="h-4 w-8 rounded-full bg-red-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="green"
          icon={<span className="h-4 w-8 rounded-full bg-green-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="yellow"
          icon={<span className="h-4 w-8 rounded-full bg-yellow-600" />}
          onClick={handleButtonClick}
        />
        <Button
          name="blue"
          icon={<span className="h-4 w-8 rounded-full bg-blue-600" />}
          onClick={handleButtonClick}
        />
      </section>
    </>
  );
}
