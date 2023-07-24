"use client";
import { useMemo } from "react";
import Link from "next/link";

import { type ListItem, ListItemType } from "@/types/list";
import { useHomeAssistant } from "@/providers/homeAssistant";

export default function List({ items: itemsIn }: { items: Array<ListItem> }) {
  const homeAssistant = useHomeAssistant();

  const items = useMemo<Array<ListItem>>(() => {
    const entities = homeAssistant.entities;
    if (!entities)
      return itemsIn.map(
        (item: ListItem): ListItem => ({ ...item, iconColor: "text-gray-400" }),
      );

    return itemsIn.map((item: ListItem): ListItem => {
      console.log("Item:", item);
      if (
        item.type !== ListItemType.Entity ||
        !homeAssistant.client ||
        !homeAssistant.entities
      )
        return item;

      const entity = homeAssistant.entities[item.key];
      console.log("Entity:", entity);

      const color = entity
        ? homeAssistant.client.getIconColor(entity)
        : "text-gray-400";
      console.log("Color:", color);

      return {
        ...item,
        iconColor: color,
      };
    });
  }, [homeAssistant.client, homeAssistant.entities, itemsIn]);

  return (
    <section className="flex min-w-full flex-col items-center justify-center">
      <ul className="selectable-list flex min-w-full flex-col gap-3 px-2">
        {items.map(({ key, name, url, icon, iconColor, onClick }: ListItem) => {
          const isClassName =
            typeof iconColor === "string" && iconColor.startsWith("text-");
          return url ? (
            <Link
              key={key}
              href={url}
              className="flex flex-row items-center gap-3"
            >
              <span
                className={isClassName ? iconColor : undefined}
                style={{ color: !isClassName ? iconColor : undefined }}
              >
                {icon}
              </span>
              <span>{name}</span>
            </Link>
          ) : (
            <a
              key={key}
              className="flex cursor-pointer flex-row items-center gap-3"
              onClick={onClick}
            >
              <span
                className={isClassName ? iconColor : undefined}
                style={{ color: !isClassName ? iconColor : undefined }}
              >
                {icon}
              </span>
              <span>{name}</span>
            </a>
          );
        })}
      </ul>
    </section>
  );
}
