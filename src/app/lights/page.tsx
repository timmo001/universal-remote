"use server";
import { LightBulbIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import List from "@/components/list";

const items: Array<ListItem> = [
  {
    key: "light.light1",
    name: "Light 1",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-400" />,
  },
];

export default async function Lights() {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold">Lights</h2>
      <List items={items} />
    </>
  );
}
