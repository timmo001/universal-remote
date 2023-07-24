"use server";
import {
  LightBulbIcon,
  CogIcon,
  MusicalNoteIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

import { type ListItem, ListItemType } from "@/types/list";
import List from "@/components/list";

const items: Array<ListItem> = [
  {
    key: "tv",
    type: ListItemType.Link,
    name: "TV",
    url: "/tv",
    icon: <TvIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "media",
    type: ListItemType.Link,
    name: "Media",
    url: "/media",
    icon: <MusicalNoteIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "lights",
    type: ListItemType.Link,
    name: "Lights",
    url: "/lights",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "switches",
    type: ListItemType.Link,
    name: "Switches",
    url: "/switches",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    key: "settings",
    type: ListItemType.Link,
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
