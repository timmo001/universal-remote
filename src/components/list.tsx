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
      if (
        item.type !== ListItemType.Entity ||
        !homeAssistant.client ||
        !homeAssistant.entities
      )
        return item;

      const entity = homeAssistant.entities[item.key];

      return {
        ...item,
        iconColor: entity
          ? homeAssistant.client.getIconColor(entity)
          : "text-gray-400",
      };
    });
  }, [homeAssistant.client, homeAssistant.entities, itemsIn]);

  return (
    <section className="flex min-w-full flex-col items-center justify-center">
      <ul className="selectable-list flex min-w-full flex-col gap-3 px-2">
        {items.map(
          ({
            key,
            type,
            name,
            url,
            icon,
            iconColor,
            selected,
            onClick,
          }: ListItem) => {
            const isClassName =
              typeof iconColor === "string" && iconColor.startsWith("text-");
            return url ? (
              <Link
                key={key}
                href={url}
                className="flex flex-row items-center gap-3"
                replace={type === ListItemType.Source}
              >
                <span
                  className={
                    selected
                      ? "text-purple-400"
                      : isClassName
                      ? iconColor
                      : undefined
                  }
                  style={{ color: !isClassName ? iconColor : undefined }}
                >
                  {icon}
                </span>
                <span>{name}</span>
              </Link>
            ) : (
              <a
                key={key}
                className={`flex ${
                  selected ? "cursor-default" : "cursor-pointer"
                } flex-row items-center gap-3`}
                onClick={onClick}
              >
                <span
                  className={
                    selected
                      ? "text-purple-400"
                      : isClassName
                      ? iconColor
                      : undefined
                  }
                  style={{ color: !isClassName ? iconColor : undefined }}
                >
                  {icon}
                </span>
                <span>{name}</span>
              </a>
            );
          },
        )}
      </ul>
    </section>
  );
}
