"use server";
import {
  mdiCogOutline,
  mdiLightSwitch,
  mdiLightbulbOutline,
  mdiMusicNoteOutline,
  mdiTelevision,
} from "@mdi/js";
import Icon from "@mdi/react";

import { type ListItem, ListItemType } from "@/types/list";
import List from "@/components/list";

const items: Array<ListItem> = [
  {
    key: "tv",
    type: ListItemType.Link,
    name: "TV",
    url: "/tv",
    icon: <Icon title="TV" size={1} path={mdiTelevision} />,
  },
  {
    key: "media",
    type: ListItemType.Link,
    name: "Media",
    url: "/media",
    icon: <Icon title="Media" size={1} path={mdiMusicNoteOutline} />,
  },
  {
    key: "lights",
    type: ListItemType.Link,
    name: "Lights",
    url: "/lights",
    icon: <Icon title="Lights" size={1} path={mdiLightbulbOutline} />,
  },
  {
    key: "switches",
    type: ListItemType.Link,
    name: "Switches",
    url: "/switches",
    icon: <Icon title="Switches" size={1} path={mdiLightSwitch} />,
  },
  {
    key: "settings",
    type: ListItemType.Link,
    name: "Settings",
    url: "/settings",
    icon: <Icon title="Settings" size={1} path={mdiCogOutline} />,
  },
];

export default async function Home() {
  return (
    <>
      <List items={items} />
    </>
  );
}
