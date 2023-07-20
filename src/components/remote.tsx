"use client";
import { MouseEvent, MouseEventHandler } from "react";
import {
  PowerIcon,
  PlusIcon,
  SpeakerXMarkIcon,
  ChevronUpIcon,
  MinusIcon,
  ChevronDownIcon,
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

export default function Remote({}: {}) {
  function handleButtonClick(event: MouseEvent<HTMLButtonElement>): void {
    console.log("Button clicked:", event.currentTarget.name);
  }

  return (
    <>
      <section className="grid min-w-full grid-cols-1 gap-4">
        <Button
          name="power"
          icon={<PowerIcon className="h-6 w-6 text-red-600" />}
          onClick={handleButtonClick}
        />
      </section>
      <section className="grid min-w-full grid-cols-3 gap-4">
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
      <section className="grid min-w-full grid-cols-3 gap-4">
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
    </>
  );
}
