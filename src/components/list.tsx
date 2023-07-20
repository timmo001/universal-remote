"use server";
import Link from "next/link";

import type { ListItem } from "@/types/list";

function Item({ name, icon }: ListItem) {
  return (
    <>
      {icon}
      <span>{name}</span>
    </>
  );
}

export default async function List({ items }: { items: Array<ListItem> }) {
  return (
    <section className="flex min-w-full flex-col items-center justify-center">
      <ul className="selectable-list flex flex-col gap-3">
        {items.map(({ name, url, icon }: ListItem) => (
          <>
            {url ? (
              <Link
                key={url}
                href={url}
                className="flex flex-row items-center gap-2">
                <Item name={name} url={url} icon={icon} />
              </Link>
            ) : (
              <a key={name} className="flex flex-row items-center gap-2">
                <Item name={name} url={url} icon={icon} />
              </a>
            )}
          </>
        ))}
      </ul>
    </section>
  );
}
