"use server";
import {
  LightBulbIcon,
  CogIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import List from "@/components/list";

const items: Array<ListItem> = [
  {
    key: "tv",
    name: "TV",
    url: "/tv",
    icon: <TvIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "music",
    name: "Music",
    url: "/music",
    icon: <MusicalNoteIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "lights",
    name: "Lights",
    url: "/lights",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "setup",
    name: "Setup",
    url: "/setup",
    icon: <CogIcon className="h-6 w-6 text-gray-400" />,
  },
];

export default async function Home() {
  return (
    <>
      <List items={items} />
    </>
  );
}
