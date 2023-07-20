"use server";
import { TvIcon, ServerIcon } from "@heroicons/react/24/outline";

import type { ListItem } from "@/types/list";
import List from "@/components/list";
import Remote from "@/components/remote";

const sources: Array<ListItem> = [
  {
    name: "TV",
    icon: <TvIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    name: "Set-top Box",
    icon: <ServerIcon className="h-6 w-6 text-gray-400" />,
  },
  {
    name: "Disney+",
    icon: <span className="text-lg">D+</span>,
  },
  {
    name: "Netflix",
    icon: <span className="mr-3 text-lg">N</span>,
  },
  {
    name: "Prime Video",
    icon: <span className="mr-3 text-lg">P</span>,
  },
  {
    name: "YouTube",
    icon: <span className="mr-3 text-lg">Y</span>,
  },
];

export default async function Home() {
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold">Remote</h2>
      <Remote />
      <h2 className="text-2xl font-bold">Sources</h2>
      <List items={sources} />
    </>
  );
}
