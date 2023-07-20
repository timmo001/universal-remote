"use server";
import Link from "next/link";

import type { ListItem } from "@/types/list";

export default async function List({ items }: { items: Array<ListItem> }) {
  return (
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
  );
}
