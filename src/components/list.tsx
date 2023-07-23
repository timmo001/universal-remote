"use client";
import Link from "next/link";

import type { ListItem } from "@/types/list";

export default function List({ items }: { items: Array<ListItem> }) {
  return (
    <section className="flex min-w-full flex-col items-center justify-center">
      <ul className="selectable-list flex min-w-full flex-col gap-3 px-2">
        {items.map(({ key, name, url, icon, onClick }: ListItem) =>
          url ? (
            <Link
              key={key}
              href={url}
              className="flex flex-row items-center gap-3"
            >
              {icon}
              {name}
            </Link>
          ) : (
            <a
              key={key}
              className="flex cursor-pointer flex-row items-center gap-3"
              onClick={onClick}
            >
              {icon}
              {name}
            </a>
          ),
        )}
      </ul>
    </section>
  );
}
