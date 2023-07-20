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
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  PowerIcon,
  SpeakerXMarkIcon,
  StopIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

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

export default function Remote() {
  function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Button clicked:", event.currentTarget.name);
  }

  return (
    <>
      <section className="grid min-w-full grid-cols-1 gap-x-2 gap-y-4">
        <Button
          name="power"
          icon={<PowerIcon className="h-6 w-6 text-red-600" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-2 gap-y-4">
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
      <section className="grid min-w-full grid-cols-3 gap-x-2 gap-y-4">
        <Button
          name="volumeUp"
          icon={<PlusIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="mute"
          icon={<SpeakerXMarkIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="channelUp"
          icon={<ChevronUpIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="volumeDown"
          icon={<MinusIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <div />
        <Button
          name="channelDown"
          icon={<ChevronDownIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-x-2 gap-y-4">
        <Button
          name="home"
          icon={<HomeIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="up"
          icon={<ChevronUpIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="settings"
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="left"
          icon={<ChevronLeftIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="ok"
          icon={<span className="text-2xl">OK</span>}
          onClick={handleButtonClick}
        />
        <Button
          name="right"
          icon={<ChevronRightIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="back"
          icon={<ArrowUturnLeftIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="down"
          icon={<ChevronDownIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="guide"
          icon={<TvIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-4 justify-between gap-x-2 gap-y-4">
        <Button
          name="rewind"
          icon={<BackwardIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
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
        <Button
          name="fastForward"
          icon={<ForwardIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-2 justify-between gap-x-2 gap-y-4">
        <Button
          name="stop"
          icon={<StopIcon className="h-6 w-6" />}
          onClick={handleButtonClick}
        />
        <Button
          name="record"
          icon={<span className="h-5 w-5 rounded-full bg-red-600" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-4 gap-x-2 gap-y-4">
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
