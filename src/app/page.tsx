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
    key: "media",
    name: "Media",
    url: "/media",
    icon: <MusicalNoteIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "lights",
    name: "Lights",
    url: "/lights",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "settings",
    name: "Settings",
    url: "/settings",
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
