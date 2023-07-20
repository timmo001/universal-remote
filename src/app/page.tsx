"use server";
import Link from "next/link";
import {
  LightBulbIcon,
  CogIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

interface ListItem {
  name: string;
  url: string;
  icon: JSX.Element;
}

const items: Array<ListItem> = [
  {
    name: "TV",
    url: "/tv",
    icon: <TvIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    name: "Music",
    url: "/music",
    icon: <MusicalNoteIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    name: "Lights",
    url: "/lights",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: <CogIcon className="h-6 w-6 text-gray-400" />,
  },
];

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex min-w-full flex-col items-center justify-center">
        <ul className="selectable-list flex flex-col gap-3">
          {items.map(({ name, url, icon }: ListItem) => (
            <Link
              key={url}
              href={url}
              className="flex flex-row items-center gap-2">
              {icon}
              <span>{name}</span>
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
